

export type SystemFeatures = {
    branding: {
        enabled: boolean
        login_page_logo: string
        workspace_logo: string
        favicon: string
        application_title: string
    }
}

export const defaultSystemFeatures: SystemFeatures = {
    branding: {
        enabled: false,
        login_page_logo: '',
        workspace_logo: '',
        favicon: '',
        application_title: 'test title',
    },
}