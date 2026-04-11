'use client'

import { Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from '@issue-tracker/ui/components'
import { useLanguage, type Language } from '@/lib/i18n'

export function Header() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'es', label: 'Español', flag: 'ES' },
  ]

  return (
    <header className="flex h-14 items-center justify-end gap-2 border-b border-border bg-background px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="size-4" />
            <span className="text-xs font-medium">{language.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => { setLanguage(lang.code) }}
              className={language === lang.code ? 'bg-accent' : ''}
            >
              <span className="mr-2 font-mono text-xs">{lang.flag}</span>
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => { setTheme('light') }}>
            {t('theme.light')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setTheme('dark') }}>
            {t('theme.dark')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setTheme('system') }}>
            {t('theme.system')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
