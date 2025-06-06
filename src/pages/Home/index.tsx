import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { CoffeeCard } from '../../components/CoffeeCard'

import { CoffeeList, Heading, Hero, HeroContent, Info } from './styles'
import { useState, useEffect } from 'react';

import { api } from '../../serves/api';

interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
};

function Loading() {
  return <p>Aguarde, estamos preparando o melhor café pra você!</p>;
}

export function Home() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  useEffect(() => {
    async function fetchCoffeeData() {
      try {
        const response = await api.get("/coffees")
        setCoffees(response.data)
        console.log(coffees)
      } catch (error) {
        console.error("Erro ao buscar os cafés:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoffeeData();

  }, []);
  
  function incrementQuantity(id: string) {
    setCoffees((prevState) =>
    prevState.map((coffee) => {
      if (coffee.id === id && coffee.quantity < 5){
        const coffeeQuantity = coffee.quantity+1;
        return {
          ...coffee,
          quantity: coffeeQuantity
        }
      }
      return coffee
    }),
  )}


  function decrementQuantity(id: string) {
    setCoffees((prevState) =>
      prevState.map((coffee) => {
        if (coffee.id === id && coffee.quantity > 0){
          const coffeeQuantity = coffee.quantity-1;
          return {
            ...coffee,
            quantity: coffeeQuantity
          }
        }
        return coffee
      }),
    )}

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nossos cafés</h2>
        {loading ? (<Loading></Loading>) : (
          <div>
          {coffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              />
            ))}
          </div>
        )}
      </CoffeeList>
    </div>
  )
}
