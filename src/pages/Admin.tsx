import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Save, Download, Upload, Trash2, Plus, LogOut } from "lucide-react";
import suitsData from "@/data/suits.json";
import fabricsData from "@/data/fabrics.json";
import lookbookData from "@/data/lookbook.json";
import settingsData from "@/data/settings.json";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [suits, setSuits] = useState(suitsData);
  const [fabrics, setFabrics] = useState(fabricsData);
  const [lookbook, setLookbook] = useState(lookbookData);
  const [settings, setSettings] = useState(settingsData);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    const savedSuits = localStorage.getItem('maxjuma-suits');
    const savedFabrics = localStorage.getItem('maxjuma-fabrics');
    const savedLookbook = localStorage.getItem('maxjuma-lookbook');
    const savedSettings = localStorage.getItem('maxjuma-settings');

    if (savedSuits) setSuits(JSON.parse(savedSuits));
    if (savedFabrics) setFabrics(JSON.parse(savedFabrics));
    if (savedLookbook) setLookbook(JSON.parse(savedLookbook));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === settingsData.adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'true');
      loadData();
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-auth');
    setPassword("");
    navigate("/");
  };

  const saveData = () => {
    localStorage.setItem('maxjuma-suits', JSON.stringify(suits));
    localStorage.setItem('maxjuma-fabrics', JSON.stringify(fabrics));
    localStorage.setItem('maxjuma-lookbook', JSON.stringify(lookbook));
    localStorage.setItem('maxjuma-settings', JSON.stringify(settings));
    
    toast({
      title: "Changes Saved",
      description: "All changes have been saved successfully",
    });
  };

  const exportData = () => {
    const data = {
      suits,
      fabrics,
      lookbook,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maxjuma-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    toast({
      title: "Data Exported",
      description: "Backup file downloaded successfully",
    });
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.suits) setSuits(data.suits);
        if (data.fabrics) setFabrics(data.fabrics);
        if (data.lookbook) setLookbook(data.lookbook);
        if (data.settings) setSettings(data.settings);
        
        saveData();
        
        toast({
          title: "Data Imported",
          description: "Backup restored successfully",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid backup file",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-accent" />
            <CardTitle className="text-3xl font-display">Admin Panel</CardTitle>
            <p className="text-muted-foreground">Enter password to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                Login
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/")}
              >
                Back to Website
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your website content</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={saveData} className="bg-accent hover:bg-accent/90">
              <Save className="mr-2 h-4 w-4" />
              Save All
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button onClick={exportData} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Backup
            </Button>
            <Button variant="outline" asChild>
              <label>
                <Upload className="mr-2 h-4 w-4" />
                Import Backup
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              View Website
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="suits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="suits">Suits ({suits.length})</TabsTrigger>
            <TabsTrigger value="fabrics">Fabrics ({fabrics.length})</TabsTrigger>
            <TabsTrigger value="lookbook">Lookbook ({lookbook.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Suits Management */}
          <TabsContent value="suits" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Suits</CardTitle>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Suit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={JSON.stringify(suits, null, 2)}
                    onChange={(e) => {
                      try {
                        setSuits(JSON.parse(e.target.value));
                      } catch (e) {
                        // Invalid JSON, ignore
                      }
                    }}
                    rows={20}
                    className="font-mono text-sm"
                    placeholder="Edit suits JSON..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Edit the JSON directly or use the Add New Suit button. Remember to save your changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fabrics Management */}
          <TabsContent value="fabrics" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Fabrics</CardTitle>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Fabric
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={JSON.stringify(fabrics, null, 2)}
                    onChange={(e) => {
                      try {
                        setFabrics(JSON.parse(e.target.value));
                      } catch (e) {
                        // Invalid JSON, ignore
                      }
                    }}
                    rows={20}
                    className="font-mono text-sm"
                    placeholder="Edit fabrics JSON..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Edit the JSON directly or use the Add New Fabric button. Remember to save your changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lookbook Management */}
          <TabsContent value="lookbook" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Lookbook</CardTitle>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={JSON.stringify(lookbook, null, 2)}
                    onChange={(e) => {
                      try {
                        setLookbook(JSON.parse(e.target.value));
                      } catch (e) {
                        // Invalid JSON, ignore
                      }
                    }}
                    rows={20}
                    className="font-mono text-sm"
                    placeholder="Edit lookbook JSON..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Edit the JSON directly or use the Add New Item button. Remember to save your changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Management */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Site Name</Label>
                      <Input
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp Number</Label>
                      <Input
                        value={settings.whatsappNumber}
                        onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <Input
                      value={settings.hours}
                      onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Instagram URL</Label>
                      <Input
                        value={settings.instagram}
                        onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Facebook URL</Label>
                      <Input
                        value={settings.facebook}
                        onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>TikTok URL</Label>
                      <Input
                        value={settings.tiktok}
                        onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Admin Password</Label>
                    <Input
                      type="password"
                      value={settings.adminPassword}
                      onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Change the admin panel password (takes effect after save)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
