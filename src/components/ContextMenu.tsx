import { useState, useEffect, useCallback } from 'react'
import './ContextMenu.css'

interface ContextMenuData {
    isEditable: boolean
    hasSelection: boolean
    editFlags: {
        canUndo: boolean
        canRedo: boolean
        canCut: boolean
        canCopy: boolean
        canPaste: boolean
        canSelectAll: boolean
    }
    x: number
    y: number
}

interface MenuItem {
    label: string
    icon: React.ReactNode
    action: string
    enabled: boolean
    divider?: boolean
}

export function ContextMenu() {
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])

    const handleContextMenu = useCallback((_event: any, data: ContextMenuData) => {
        const { isEditable, hasSelection, editFlags, x, y } = data

        if (!isEditable && !hasSelection) {
            setVisible(false)
            return
        }

        const items: MenuItem[] = []

        if (isEditable) {
            items.push({
                label: '復原',
                icon: <UndoIcon />,
                action: 'undo',
                enabled: editFlags.canUndo
            })
            items.push({
                label: '重做',
                icon: <RedoIcon />,
                action: 'redo',
                enabled: editFlags.canRedo,
                divider: true
            })
            items.push({
                label: '剪下',
                icon: <CutIcon />,
                action: 'cut',
                enabled: editFlags.canCut
            })
            items.push({
                label: '複製',
                icon: <CopyIcon />,
                action: 'copy',
                enabled: editFlags.canCopy
            })
            items.push({
                label: '貼上',
                icon: <PasteIcon />,
                action: 'paste',
                enabled: editFlags.canPaste,
                divider: true
            })
            items.push({
                label: '全選',
                icon: <SelectAllIcon />,
                action: 'selectAll',
                enabled: editFlags.canSelectAll
            })
        } else if (hasSelection) {
            items.push({
                label: '複製',
                icon: <CopyIcon />,
                action: 'copy',
                enabled: true
            })
        }

        setMenuItems(items)
        setPosition({ x, y })
        setVisible(true)
    }, [])

    const handleClick = useCallback(() => {
        setVisible(false)
    }, [])

    const handleMenuItemClick = (action: string) => {
        window.api.execCommand(action)
        setVisible(false)
    }

    useEffect(() => {
        window.api.onContextMenu(handleContextMenu)
        document.addEventListener('click', handleClick)
        document.addEventListener('contextmenu', handleClick)

        return () => {
            window.api.offContextMenu(handleContextMenu)
            document.removeEventListener('click', handleClick)
            document.removeEventListener('contextmenu', handleClick)
        }
    }, [handleContextMenu, handleClick])

    if (!visible || menuItems.length === 0) return null

    // Adjust position to keep menu in viewport
    const adjustedX = Math.min(position.x, window.innerWidth - 180)
    const adjustedY = Math.min(position.y, window.innerHeight - (menuItems.length * 36 + 20))

    return (
        <div
            className="context-menu"
            style={{
                left: adjustedX,
                top: adjustedY
            }}
        >
            {menuItems.map((item, index) => (
                <div key={index}>
                    <button
                        className={`context-menu-item ${!item.enabled ? 'disabled' : ''}`}
                        onClick={() => item.enabled && handleMenuItemClick(item.action)}
                        disabled={!item.enabled}
                    >
                        <span className="context-menu-icon">{item.icon}</span>
                        <span className="context-menu-label">{item.label}</span>
                    </button>
                    {item.divider && <div className="context-menu-divider" />}
                </div>
            ))}
        </div>
    )
}

// Icons
function UndoIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H9C10.6569 5 12 6.34315 12 8C12 9.65685 10.6569 11 9 11H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 3L3 5L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function RedoIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5H5C3.34315 5 2 6.34315 2 8C2 9.65685 3.34315 11 5 11H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 3L11 5L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function CutIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 9.5L10 2M8.5 9.5L4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function CopyIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 5V3.5C9 2.67157 8.32843 2 7.5 2H3.5C2.67157 2 2 2.67157 2 3.5V7.5C2 8.32843 2.67157 9 3.5 9H5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

function PasteIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 2.5C5.5 1.67157 6.17157 1 7 1C7.82843 1 8.5 1.67157 8.5 2.5V3H9V4H5V3H5.5V2.5Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    )
}

function SelectAllIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 7L6.5 8.5L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
