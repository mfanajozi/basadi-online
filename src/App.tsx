import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useTheme, ThemeProvider } from './hooks/useTheme';
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import React from 'react';

interface Theme {
  background: string;
  foreground: string;
}

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.foreground};
  }
`;

const StyledApp = styled.div`
  min-height: 100vh;
  text-align: center;
`;

const ToggleButton = styled.button<{ theme: Theme }>`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 34px;
  border: none;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    top: 4px;
    left: 4px;
    transition: 0.3s;
  }

  &[data-theme='dark'] {
    background-color: #333;
  }

  &[data-theme='dark']:after {
    transform: translateX(26px);
  }
`;

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider>
      <GlobalStyle theme={theme} />
      <StyledApp>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <ToggleButton onClick={toggleTheme} data-theme={theme.background === 'black' ? 'dark' : 'light'} />
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
