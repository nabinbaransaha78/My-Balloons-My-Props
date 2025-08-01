import { SignIn, useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Login = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Login
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Sign in to access the admin panel
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-brand-red hover:bg-red-600 text-white',
                  card: 'shadow-none border-0',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
                  formFieldInput: 'border-gray-300 focus:border-brand-red focus:ring-brand-red',
                  footerActionLink: 'text-brand-red hover:text-red-600'
                }
              }}
              redirectUrl="/admin"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;