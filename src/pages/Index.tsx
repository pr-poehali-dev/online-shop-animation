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
            <span className="text-xl font-bold">TexnoSfera+</span>
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
            <Badge className="mb-4" variant="secondary">Новая коллекция 2025</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Технологии будущего
              <span className="block mt-2 text-purple-700">уже сегодня</span>
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
            <div className="grid md:grid-cols-3 gap-8">
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
                      <Icon name="HeadphonesIcon" className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Поддержка</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Техподдержка с понедельника по пятницу с 13:00 до 19:00. Звоните: +7 (980) 067-28-94
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
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
                <span className="text-xl font-bold">TexnoSfera+</span>
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
                  <span>import java.util.Scanner;
import java.util.Random;

public class MothersDayGame {
    private static Scanner scanner = new Scanner(System.in);
    private static Random random = new Random();
    private static int score = 0;
    
    public static void main(String[] args) {
        System.out.println("🎮 Добро пожаловать в игру 'С Днём Матери!' 🎮");
        System.out.println("==============================================");
        System.out.println("Помоги маленькому ребёнку подготовить сюрприз для мамы!");
        System.out.println();
        
        // Запускаем различные мини-игры
        arrangeFlowers();
        bakeCake();
        writePoem();
        chooseGift();
        finalSurprise();
        
        // Выводим итоговый результат
        showResults();
        
        scanner.close();
    }
    
    // Мини-игра 1: Расстановка цветов
    private static void arrangeFlowers() {
        System.out.println("🌸 МИНИ-ИГРА 1: Расставь букет цветов 🌸");
        System.out.println("Помоги расставить цветы в вазу красиво!");
        System.out.println("Сколько цветков роз добавить в букет? (от 1 до 5)");
        
        int roses = getNumberInput(1, 5);
        System.out.println("Сколько цветков тюльпанов добавить? (от 1 до 5)");
        int tulips = getNumberInput(1, 5);
        
        if (roses + tulips <= 7) {
            System.out.println("✅ Отлично! Букет получился красивым и гармоничным!");
            score += 10;
        } else {
            System.out.println("❌ Ой, цветов слишком много! Но мама всё равно обрадуется!");
            score += 5;
        }
        System.out.println();
    }
    
    // Мини-игра 2: Выпечка торта
    private static void bakeCake() {
        System.out.println("🎂 МИНИ-ИГРА 2: Испеки торт для мамы 🎂");
        System.out.println("Выбери правильную последовательность действий:");
        System.out.println("1. Включить духовку");
        System.out.println("2. Приготовить тесто");
        System.out.println("3. Смешать ингредиенты");
        System.out.println("4. Украсить торт");
        
        System.out.println("Введи правильную последовательность цифр (например: 1234):");
        
        String answer = scanner.next();
        if (answer.equals("1324")) {
            System.out.println("✅ Правильно! Торт получился восхитительным!");
            score += 15;
        } else {
            System.out.println("❌ Почти получилось! Правильный порядок: 1-3-2-4");
            System.out.println("Но маме понравится любой торт, испечённый с любовью!");
            score += 8;
        }
        System.out.println();
    }
    
    // Мини-игра 3: Написание стихотворения
    private static void writePoem() {
        System.out.println("📝 МИНИ-ИГРА 3: Составь стихотворение для мамы 📝");
        System.out.println("Заполни пропуски в стихотворении:");
        
        System.out.println("Мама — это самый _____ человек на свете,");
        System.out.println("Она дарит свою _____ и тепло детям.");
        System.out.println("В День матери хочу сказать _____,");
        System.out.println("Что буду я тебя всегда _____!");
        
        System.out.print("Первое слово (добрый/любимый/лучший): ");
        String word1 = scanner.next();
        
        System.out.print("Второе слово (любовь/заботу/радость): ");
        String word2 = scanner.next();
        
        System.out.print("Третье слово (спасибо/поздравляю/люблю): ");
        String word3 = scanner.next();
        
        System.out.print("Четвёртое слово (любить/помнить/ценить): ");
        String word4 = scanner.next();
        
        System.out.println("\n✨ Твоё стихотворение:");
        System.out.println("Мама — это самый " + word1 + " человек на свете,");
        System.out.println("Она дарит свою " + word2 + " и тепло детям.");
        System.out.println("В День матери хочу сказать " + word3 + ",");
        System.out.println("Что буду я тебя всегда " + word4 + "!");
        
        System.out.println("\n💖 Мама будет рада любому стихотворению!");
        score += 12;
        System.out.println();
    }
    
    // Мини-игра 4: Выбор подарка
    private static void chooseGift() {
        System.out.println("🎁 МИНИ-ИГРА 4: Выбери подарок для мамы 🎁");
        System.out.println("Какой подарок больше всего обрадует маму?");
        System.out.println("1. Дорогие духи");
        System.out.println("2. Сделанная своими руками открытка");
        System.out.println("3. Новая сумочка");
        System.out.println("4. Помощь по дому на неделю вперёд");
        
        int choice = getNumberInput(1, 4);
        
        if (choice == 2 || choice == 4) {
            System.out.println("✅ Идеально! Самые лучшие подарки — это внимание и забота!");
            score += 20;
        } else {
            System.out.println("✅ Хороший выбор! Маме понравится любой твой подарок!");
            score += 10;
        }
        System.out.println();
    }
    
    // Финальная сцена
    private static void finalSurprise() {
        System.out.println("🎉 ФИНАЛЬНЫЙ СЮРПРИЗ! 🎉");
        System.out.println("Мама приходит домой...");
        System.out.println();
        
        for (int i = 3; i > 0; i--) {
            System.out.println("..." + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        System.out.println("СЮРПРИЗ!!!");
        System.out.println();
        System.out.println("💐 Мама видит красивый букет, вкусный торт,");
        System.out.println("трогательное стихотворение и твой подарок!");
        System.out.println("Её глаза наполняются слезами радости...");
        System.out.println("\"Это самый лучший День матери в моей жизни!\" - говорит она.");
        System.out.println();
        System.out.println("💖 ТЫ СДЕЛАЛ(А) МАМУ СЧАСТЛИВОЙ! 💖");
        
        score += 25;
    }
    
    // Показать результаты
    private static void showResults() {
        System.out.println("==============================================");
        System.out.println("🎊 ИТОГИ ИГРЫ 🎊");
        System.out.println("Твой результат: " + score + " из 82 баллов!");
        
        if (score >= 70) {
            System.out.println("🏆 Ты - настоящий герой Дня матери!");
            System.out.println("Мама безумно счастлива и гордится тобой!");
        } else if (score >= 50) {
            System.out.println("⭐ Отличная работа!");
            System.out.println("Мама очень тронута твоей заботой!");
        } else {
            System.out.println("👍 Хорошая попытка!");
            System.out.println("Главное - это внимание, а мама ценит любые усилия!");
        }
        
        System.out.println();
        System.out.println("💝 С ПРАЗДНИКОМ ЛЮБИМОЙ МАМЫ! 💝");
        System.out.println("Пусть каждый её день будет наполнен радостью!");
    }
    
    // Вспомогательный метод для ввода чисел
    private static int getNumberInput(int min, int max) {
        while (true) {
            try {
                int input = scanner.nextInt();
                if (input >= min && input <= max) {
                    return input;
                } else {
                    System.out.println("Пожалуйста, введи число от " + min + " до " + max + ":");
                }
            } catch (Exception e) {
                System.out.println("Пожалуйста, введи корректное число:");
                scanner.next(); // очистка неправильного ввода
            }
        }
    }
}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Clock" className="h-4 w-4" />
                  <span>Пн-Пт: 12:00 - 20:00</span>
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