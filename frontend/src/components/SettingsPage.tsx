import React from 'react';
import { Mail, Bell, Shield, Smartphone, Globe, CreditCard, Trash2, Save, User, Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-[2px] text-foreground flex items-center gap-3">
          <Settings className="text-accent w-8 h-8" />
          Account Settings
        </h1>
        <p className="text-muted text-sm mt-1">Manage your profile, notifications, and monitoring preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-surface border border-border rounded-none overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-surface-hover">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-accent" /> Profile Information
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] text-muted uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input 
                  className="w-full bg-background border border-border rounded-none text-sm px-4 py-2.5 outline-none focus:border-accent transition-colors"
                  defaultValue="Sudip Pandey"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted uppercase tracking-wider mb-1.5 block">Email Address</label>
                <input 
                  className="w-full bg-background border border-border rounded-none text-sm px-4 py-2.5 outline-none focus:border-accent transition-colors"
                  defaultValue="sudip10k89@gmail.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-surface border border-border rounded-none overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-surface-hover">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent" /> Notification Channels
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-info/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-info" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Email Alerts</div>
                  <div className="text-xs text-muted">Receive instant price drop emails</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-accent rounded-none relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-none"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-success/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Push Notifications</div>
                  <div className="text-xs text-muted">Mobile app and browser alerts</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-border rounded-none relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-foreground rounded-none"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button className="px-6 py-2.5 bg-surface border border-border rounded-none text-sm font-semibold text-muted hover:text-foreground transition-colors">Discard Changes</button>
          <button className="px-8 py-2.5 bg-accent text-background rounded-none text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
