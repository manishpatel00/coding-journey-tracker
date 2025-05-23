import { useState } from 'react';
import { Menu, X, Code, Calendar, BookOpen, BarChart2, User, LogOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title?: string;
  onExportData?: () => void;
}

export function Header({ title = 'Coding Journey Tracker', onExportData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: <BarChart2 className="h-5 w-5 mr-2" /> },
    { name: 'Daily Plan', href: '/daily-plan', icon: <Calendar className="h-5 w-5 mr-2" /> },
    { name: 'Journey Log', href: '/journey-log', icon: <BookOpen className="h-5 w-5 mr-2" /> },
    { name: 'Stats', href: '/stats', icon: <BarChart2 className="h-5 w-5 mr-2" /> },
  ];

  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Code className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold hidden sm:block">{title}</span>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className="flex items-center"
              >
                <a href={item.href}>
                  {item.icon}
                  {item.name}
                </a>
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Export Data Button - Only show when logged in */}
            {user && onExportData && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onExportData}
                title="Export your data"
              >
                <Download className="h-5 w-5" />
              </Button>
            )}

            {/* User Menu - Only show when logged in */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.name && <p className="font-medium">{user.name}</p>}
                      {user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" asChild size="sm">
                <a href="/login">Login</a>
              </Button>
            )}

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Code className="h-6 w-6 text-primary" />
                        <span className="ml-2 text-lg font-semibold">{title}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <nav className="flex flex-col space-y-2">
                      {navigation.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          asChild
                          className="justify-start"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <a href={item.href} className="flex items-center">
                            {item.icon}
                            {item.name}
                          </a>
                        </Button>
                      ))}

                      {/* Mobile Theme Toggle */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Appearance</span>
                          <ThemeToggle />
                        </div>
                      </div>

                      {/* Export Data - Only show when logged in */}
                      {user && onExportData && (
                        <Button
                          variant="ghost"
                          className="justify-start w-full"
                          onClick={() => {
                            onExportData();
                            setIsMenuOpen(false);
                          }}
                        >
                          <Download className="h-5 w-5 mr-2" />
                          Export Data
                        </Button>
                      )}

                      {/* User Login/Logout */}
                      {user ? (
                        <>
                          <div className="pt-4 border-t">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            className="justify-start w-full text-destructive"
                            onClick={() => {
                              logout();
                              setIsMenuOpen(false);
                            }}
                          >
                            <LogOut className="h-5 w-5 mr-2" />
                            Logout
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          asChild
                          className="justify-start w-full"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <a href="/login" className="flex items-center">
                            <User className="h-5 w-5 mr-2" />
                            Login
                          </a>
                        </Button>
                      )}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
