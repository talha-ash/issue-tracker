import { X, Search } from 'lucide-react';
import {
  Button,
  Input,
  Field,
  FieldLabel,
  Avatar,
  AvatarFallback,
} from '@issue-tracker/ui/components';
import { useLanguage } from '@/lib/i18n';
import { User } from '@supabase/supabase-js';

interface SelectMembersProps {
  selectedMembers: User;
}

export function SelectMembers({ selectedMembers }: SelectMembersProps) {
  const { t } = useLanguage();
  return (
    <Field>
      <FieldLabel>{t('project.add.members')}</FieldLabel>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t('project.search.members')}
          className="pl-9"
        />
      </div>

      {/* Selected members */}
      {selectedMembers.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedMembers.map(member => (
            <div
              key={member.id}
              className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1"
            >
              <Avatar className="size-5">
                <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{member.name}</span>
              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search results */}
      {searchQuery && filteredUsers.length > 0 && (
        <div className="mt-2 rounded-lg border border-border bg-popover shadow-md">
          {filteredUsers.slice(0, 5).map(user => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-secondary text-xs">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addMember(user)}
              >
                {t('action.add')}
              </Button>
            </div>
          ))}
        </div>
      )}
    </Field>
  );
}
