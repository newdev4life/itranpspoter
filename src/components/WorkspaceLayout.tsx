import { ReactNode } from 'react'
import './WorkspaceLayout.css'

interface WorkspaceLayoutProps {
    sidebar: ReactNode
    main: ReactNode
    bottom: ReactNode
}

export function WorkspaceLayout({ sidebar, main, bottom }: WorkspaceLayoutProps) {
    return (
        <div className="workspace-layout">
            <div className="workspace-sidebar">
                {sidebar}
            </div>
            <div className="workspace-main-area">
                <div className="workspace-center">
                    {main}
                </div>
                <div className="workspace-bottom">
                    {bottom}
                </div>
            </div>
        </div>
    )
}
