import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Bell, Menu, Moon, Sun, Settings, FileText, Shield, CircleHelp as HelpCircle, LogOut, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  showMenu?: boolean;
}

export default function Header({ title, showNotifications = true, showMenu = true }: HeaderProps) {
  const { isDark, toggleTheme, colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const openNotifications = () => {
    router.push('/notifications');
  };

  const handleMenuAction = (action: string) => {
    setMenuVisible(false);
    
    switch (action) {
      case 'documents':
        router.push('/documents');
        break;
      case 'settings':
        router.push('/settings');
        break;
      case 'change-password':
        router.push('/change-password');
        break;
      case 'notifications':
        router.push('/notifications');
        break;
      case 'privacy':
        router.push('/privacy');
        break;
      case 'help':
        router.push('/help');
        break;
      case 'logout':
        router.replace('/login');
        break;
    }
  };

  const menuItems = [
    { id: 'documents', icon: FileText, label: 'Document Management', color: colors.primary },
    { id: 'settings', icon: Settings, label: 'Settings', color: colors.textSecondary },
    { id: 'notifications', icon: Bell, label: 'Notifications', color: colors.textSecondary },
    { id: 'privacy', icon: Shield, label: 'Privacy & Security', color: colors.textSecondary },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', color: colors.textSecondary },
    { id: 'logout', icon: LogOut, label: 'Logout', color: colors.error },
  ];

  return (
    <>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.logoContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoText}>DD</Text>
          </LinearGradient>
          <Text style={[styles.title, { color: colors.text }]}>MoveExpress</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.surface }]} 
            onPress={toggleTheme}
          >
            {isDark ? (
              <Sun size={20} color={colors.accent} />
            ) : (
              <Moon size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
          
          {showNotifications && (
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: colors.surface }]} 
              onPress={openNotifications}
            >
              <Bell size={20} color={colors.primary} />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          )}
          
          {showMenu && (
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: colors.surface }]} 
              onPress={() => setMenuVisible(true)}
            >
              <Menu size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
            <View style={styles.menuHeader}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <X size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, { borderBottomColor: colors.border }]}
                onPress={() => handleMenuAction(item.id)}
              >
                <item.icon size={20} color={item.color} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    position: 'relative',
    padding: 10,
    borderRadius: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 20,
  },
  menuContainer: {
    borderRadius: 16,
    minWidth: 250,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});