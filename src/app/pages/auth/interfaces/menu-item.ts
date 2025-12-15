export interface MenuItem {
    icon?: string;
    label: string;
    route?: string;
    divider?: boolean;
    hidden?: boolean;
    items?: MenuItem[];
    font_set: string;
}