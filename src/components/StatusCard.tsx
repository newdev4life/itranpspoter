import './StatusCard.css'

interface StatusCardProps {
    title: string
    status: 'success' | 'error' | 'warning' | 'info' | 'loading'
    description?: string
    action?: {
        label: string
        onClick: () => void
    }
}

export function StatusCard({ title, status, description, action }: StatusCardProps) {
    const statusIcons = {
        success: '✓',
        error: '✗',
        warning: '!',
        info: 'i',
        loading: '⟳'
    }

    return (
        <div className={`status-card status-card-${status}`}>
            <div className={`status-icon ${status === 'loading' ? 'animate-spin' : ''}`}>
                {statusIcons[status]}
            </div>
            <div className="status-content">
                <h4 className="status-title">{title}</h4>
                {description && <p className="status-description">{description}</p>}
            </div>
            {action && (
                <button className="btn btn-sm btn-ghost" onClick={action.onClick}>
                    {action.label}
                </button>
            )}
        </div>
    )
}
