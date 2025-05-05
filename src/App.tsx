import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;