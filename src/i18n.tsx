import { createContext, useContext, useState, ReactNode } from 'react'
import { zhTW } from './locales/zh-TW'

// Since we only maintain one language for now (as requested "add chinese localizations"), 
// we will structure this to support more languages easily, but default to zh-TW.
// If the user wants to switch back to English, we can add 'en' later. 
// For now, I'll treat "zh-TW" as the primary language.

type Locale = 'zh-TW' | 'en'

// Simple object for English keys (fallback) - in a real app create a separate file
// For this task, we assume the user wants the UI in Chinese.
// If a key is missing in zhTW, we can fallback to the key itself or English if we had it.

interface I18nContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export const useTranslation = () => {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider')
    }
    return context
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    // Default to 'zh-TW'
    const [locale, setLocale] = useState<Locale>('zh-TW')

    const t = (key: string, params?: Record<string, string | number>): string => {
        let text = (zhTW as Record<string, string>)[key] || key

        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, String(v))
            })
        }

        return text
    }

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    )
}
