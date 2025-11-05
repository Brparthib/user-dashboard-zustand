import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Navigation, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center space-y-8">
          {/* Illustration */}
          <div className="relative">
            <div className="w-48 h-48 bg-linear-to-br from-primary/15 to-secondary/25 rounded-full mx-auto flex items-center justify-center">
              <div className="w-32 h-32 bg-linear-to-br from-primary/20 to-secondary/30 rounded-full flex items-center justify-center">
                <Navigation className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Page not found
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. Perhaps you'd like to go back to the homepage?
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" className="gap-2 active:scale-95">
              <Link to="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="gap-2 active:scale-95">
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </Button>
          </div>

          {/* Additional Help */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              If you believe this is an error, please{' '}
              <Link to="/contact" className="text-secondary-foreground dark:text-primary hover:underline">
                contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}