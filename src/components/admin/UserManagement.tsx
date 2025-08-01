import { useState } from 'react';
import { useUser, useOrganization } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, UserPlus, Search, Mail, Calendar, 
  Shield, Crown, User as UserIcon 
} from 'lucide-react';
import { toast } from 'sonner';

const UserManagement = () => {
  const { user } = useUser();
  const { organization } = useOrganization();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data - in real app, fetch from Clerk API
  const users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@myballoons.com',
      role: 'admin',
      avatar: '',
      lastActive: '2 minutes ago',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Store Manager',
      email: 'manager@myballoons.com',
      role: 'manager',
      avatar: '',
      lastActive: '1 hour ago',
      joinDate: '2024-02-01',
      status: 'active'
    },
    {
      id: '3',
      name: 'Content Editor',
      email: 'editor@myballoons.com',
      role: 'editor',
      avatar: '',
      lastActive: '1 day ago',
      joinDate: '2024-02-15',
      status: 'inactive'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'manager':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-yellow-100 text-yellow-800',
      manager: 'bg-blue-100 text-blue-800',
      editor: 'bg-green-100 text-green-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleInviteUser = () => {
    toast.success('User invitation sent! They will receive an email to join.');
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    toast.success(`User role updated to ${newRole}`);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
            <Button onClick={handleInviteUser} className="bg-brand-red hover:bg-red-600">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline" className="text-sm">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {/* Current User Info */}
          <Card className="mb-6 border-brand-red">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-brand-red text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">
                      {user?.firstName} {user?.lastName} (You)
                    </h3>
                    <Badge className="bg-brand-red text-white">Current User</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-500">Super Admin</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((userData) => (
              <Card key={userData.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userData.avatar} />
                        <AvatarFallback className="bg-gray-200">
                          {userData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{userData.name}</h4>
                          <Badge className={getRoleBadge(userData.role)}>
                            {userData.role}
                          </Badge>
                          {userData.status === 'inactive' && (
                            <Badge variant="outline" className="text-gray-500">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{userData.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Joined {userData.joinDate}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">Last active: {userData.lastActive}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getRoleIcon(userData.role)}
                      <select
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                        value={userData.role}
                        onChange={(e) => handleRoleChange(userData.id, e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="editor">Editor</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No users found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold">Admin</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• Financial reports</li>
                <li>• System settings</li>
                <li>• All content management</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Manager</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Product management</li>
                <li>• Order management</li>
                <li>• Customer support</li>
                <li>• Gallery management</li>
                <li>• Basic analytics</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Editor</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Content editing</li>
                <li>• Blog management</li>
                <li>• Gallery uploads</li>
                <li>• Basic product info</li>
                <li>• View-only analytics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;