'use client';

import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Avatar,
  AvatarFallback,
} from '@issue-tracker/ui/components';
import { useLanguage } from '@/lib/i18n';
import type { Member } from '@/lib/mock-data';

interface MembersTableProps {
  members: Member[];
}

export function MembersTable({ members }: MembersTableProps) {
  const { t } = useLanguage();

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>{t('table.member')}</TableHead>
            <TableHead>{t('auth.email')}</TableHead>
            <TableHead>{t('table.role')}</TableHead>
            <TableHead>{t('table.joined')}</TableHead>
            <TableHead className="text-right">{t('table.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map(member => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-secondary text-xs">
                      {member.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{member.user.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {member.user.email}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {t(`role.${member.role}`)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {member.joinedAt}
              </TableCell>
              <TableCell className="text-right">
                <button className="text-sm font-medium text-destructive hover:underline">
                  {t('action.remove')}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
