import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    ListPlus,
    ChevronRight,
    ClipboardPenLine,
    LayoutList,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Button } from './ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { coachesCreate, coachesIndex, dashboard, draftOrder, draftsIndex, playersCreate, playersIndex, teamsIndex, tradesIndex } from '@/routes';
import type { NavItem, GroupProps } from '@/types';
import { route } from 'ziggy-js';

const getPlayersNavItems = (groupUuid: string) => [
    {
        title: 'View & Manage',
        href: route('playersIndex', {group: groupUuid})
    },
    {
        title: 'Team View',
        href: route('teamsIndex', {group: groupUuid})
    },
    {
        title: 'Trade',
        href: route('tradesIndex', {group: groupUuid})
    },
    {
        title: 'Add Players',
        href: route('playersCreate', {group: groupUuid})
    },
];

const getCoachesNavItems = (groupUuid: string) => [
    {
        title: 'View & Manage',
        href: route('coachesIndex', {group: groupUuid}),
    },
    {
        title: 'Add Coaches',
        href: route('coachesCreate', {group: groupUuid}),
    },
];

const getDraftsNavItems = (groupUuid: string) => [
    {
        title: 'View & Manage',
        href: route('draftsIndex', {group: groupUuid})
    },
    {
        title: 'Draft Order',
        href: route('draftOrder', {group: groupUuid}),
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Create a New Group',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: ListPlus,
    },
];

interface PageProps {
    groupUuid: string;
}

export function AppSidebar() {
    const groupUuid = route().params.group as string;

    const playersNavItems = getPlayersNavItems(groupUuid);
    const coachesNavItems = getCoachesNavItems(groupUuid);
    const draftsNavItems = getDraftsNavItems(groupUuid);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard(groupUuid)} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Group #1</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Collapsible className="group/collapsible">
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <LayoutGrid className="size-5" />
                                        <span>Players</span>
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {playersNavItems.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={item.href}>{item.title}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Collapsible className="group/collapsible">
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <ClipboardPenLine className="size-5" />
                                        <span>Coaches</span>
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {coachesNavItems.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={item.href}>{item.title}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Collapsible className="group/collapsible">
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <LayoutList className="size-5" />
                                        <span>Draft</span>
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {draftsNavItems.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={item.href}>{item.title}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
