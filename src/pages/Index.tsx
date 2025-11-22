import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    battery?: string;
    camera?: string;
  };
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 129990,
    category: 'Смартфоны',
    image: 'https://cdn.poehali.dev/projects/2a9fbdd2-f785-4ebd-a387-f3f5e7271e58/files/d36a709b-8005-4c75-89b7-d6279a248af6.jpg',
    specs: {
      processor: 'A17 Pro',
      ram: '8 ГБ',
      storage: '256 ГБ',
      display: '6.7" OLED',
      camera: '48 Мп'
    },
    badge: 'Хит продаж'
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    price: 199990,
    category: 'Ноутбуки',
    image: 'https://cdn.poehali.dev/projects/2a9fbdd2-f785-4ebd-a387-f3f5e7271e58/files/00865e22-a704-45c1-8d56-960d462a8aec.jpg',
    specs: {
      processor: 'M3 Pro',
      ram: '18 ГБ',
      storage: '512 ГБ',
      display: '14.2" Liquid Retina XDR'
    },
    badge: 'Новинка'
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    price: 24990,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/2a9fbdd2-f785-4ebd-a387-f3f5e7271e58/files/d3969a05-5af4-44b6-9b29-e915c0935610.jpg',
    specs: {
      battery: 'До 6 часов'
    }
  },
  {
    id: 4,
    name: 'iPad Air M2',
    price: 79990,
    category: 'Планшеты',
    image: 'https://cdn.poehali.dev/projects/2a9fbdd2-f785-4ebd-a387-f3f5e7271e58/files/d36a709b-8005-4c75-89b7-d6279a248af6.jpg',
    specs: {
      processor: 'M2',
      ram: '8 ГБ',
      storage: '128 ГБ',
      display: '11" Liquid Retina'
    }
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra',
    price: 119990,
    category: 'Смартфоны',
    image: 'https://cdn.poehali.dev/projects/2a9fbdd2-f785-4ebd-a387-f3f5e7271e58/files/d36a709b-8005-4c75-89b7-d6279a248af6.jpg',
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12 ГБ',
      storage: '256 ГБ',
      display: '6.8" AMOLED',
      camera: '200 Мп'
    }
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    price: 34990,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/2a9fbdd2-f785-4ebd-a387-f3f5e7271e58/files/d3969a05-5af4-44b6-9b29-e915c0935610.jpg',
    specs: {
      battery: 'До 30 часов'
    },
    badge: 'Хит продаж'
  }
];

const categories = ['Все', 'Смартфоны', 'Ноутбуки', 'Планшеты', 'Аксессуары'];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TechShop</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#hero" className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </a>
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingBag" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      {cart.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-auto"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="hero" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Sparkles" className="h-3 w-3 mr-1" />
              Новая коллекция 2024
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Технологии будущего
              <span className="block text-primary mt-2">уже сегодня</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Откройте для себя мир инновационной электроники и гаджетов с лучшими характеристиками на рынке
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2">
                <Icon name="ShoppingBag" className="h-5 w-5" />
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Info" className="h-5 w-5" />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-gradient-to-br from-secondary to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">О магазине</h2>
              <p className="text-muted-foreground text-lg">
                Ваш надежный партнер в мире технологий
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="animate-fade-in">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Award" className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Качество</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Только оригинальная техника от официальных поставщиков с полной гарантией производителя
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Truck" className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Доставка</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Быстрая доставка по всей России. Бесплатная доставка при заказе от 50 000 ₽
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="HeadphonesIcon" className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Поддержка</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Профессиональная консультация и техподдержка 24/7. Всегда на связи по телефону +7 (980) 067-28-94
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Percent" className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Цены</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Конкурентные цены и регулярные акции. Программа лояльности для постоянных клиентов
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Каталог товаров</h2>
            <p className="text-muted-foreground text-lg">
              Выберите категорию и найдите идеальное устройство
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent mb-8">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        {product.badge && (
                          <Badge className="absolute top-4 left-4 z-10">
                            {product.badge}
                          </Badge>
                        )}
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {product.category}
                          </Badge>
                          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                          <p className="text-2xl font-bold text-primary">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 text-muted-foreground">
                              <Icon name="Check" className="h-4 w-4 text-primary" />
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" className="h-4 w-4" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <footer className="border-t py-12 px-4 mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Zap" className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TechShop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Мы предлагаем широкий ассортимент качественной электроники и гаджетов по лучшим ценам. Наша цель — сделать передовые технологии доступными каждому.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Смартфоны</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ноутбуки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Планшеты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Аксессуары</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантия</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  <a href="tel:+79800672894" className="hover:text-primary transition-colors">+7 (980) 067-28-94</a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  <span>info@techshop.ru</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TechShop. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}