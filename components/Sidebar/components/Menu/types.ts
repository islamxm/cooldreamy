export type menuItemType = {
    label: string,
    link: string | undefined,
    icon: React.ReactNode,
    badge: number,
    onClick: () => void,
    isActive: boolean
}