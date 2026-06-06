import { Link } from 'react-router-dom';
import learnhubLogo from '@/assets/learnhub-logo-clean.png';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src={learnhubLogo} 
                alt="LearnHub" 
                className="h-10 object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Empowering learners worldwide with quality education. 
              Access thousands of courses and learn at your own pace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-background transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-background transition-colors">
                  Become a Student
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-background transition-colors">
                  Teach on LearnHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-background transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2024 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
