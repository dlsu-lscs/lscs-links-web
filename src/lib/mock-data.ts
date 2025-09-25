export interface Link {
  id: string
  shortlink: string
  longLink: string
  createdBy: string
  createdAt: string
  updatedAt: string
  committeeId: string | null // null for personal, 'marketing' or 'product' for teams
  pinned: boolean
  clicks: number
  lastClicked: string | null
}

export const mockLinks: Link[] = [
  {
    id: "1",
    shortlink: "techsummit2025",
    longLink: "https://docs.google.com/presentation/d/1234567890/edit",
    createdBy: "sean_robenta@dlsu.edu.ph",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    committeeId: null,
    pinned: true,
    clicks: 247,
    lastClicked: "2024-01-20T14:22:00Z",
  },
  {
    id: "2",
    shortlink: "onboardingppt",
    longLink: "https://docs.google.com/presentation/d/0987654321/edit",
    createdBy: "sean_robenta@dlsu.edu.ph",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
    committeeId: null,
    pinned: false,
    clicks: 89,
    lastClicked: "2024-01-19T11:30:00Z",
  },
  {
    id: "3",
    shortlink: "q1campaign",
    longLink: "https://www.figma.com/file/campaign-designs-2024",
    createdBy: "maria_santos@dlsu.edu.ph",
    createdAt: "2024-01-08T14:20:00Z",
    updatedAt: "2024-01-08T14:20:00Z",
    committeeId: "marketing",
    pinned: true,
    clicks: 156,
    lastClicked: "2024-01-18T09:45:00Z",
  },
  {
    id: "4",
    shortlink: "brandguidelines",
    longLink: "https://drive.google.com/file/d/brand-guidelines-2024/view",
    createdBy: "alex_chen@dlsu.edu.ph",
    createdAt: "2024-01-05T11:00:00Z",
    updatedAt: "2024-01-05T11:00:00Z",
    committeeId: "marketing",
    pinned: false,
    clicks: 203,
    lastClicked: "2024-01-17T15:20:00Z",
  },
  {
    id: "5",
    shortlink: "productroadmap",
    longLink: "https://miro.com/app/board/product-roadmap-2024/",
    createdBy: "jennifer_lee@dlsu.edu.ph",
    createdAt: "2024-01-03T08:30:00Z",
    updatedAt: "2024-01-14T13:15:00Z",
    committeeId: "product",
    pinned: true,
    clicks: 312,
    lastClicked: "2024-01-19T16:10:00Z",
  },
  {
    id: "6",
    shortlink: "userresearch",
    longLink: "https://docs.google.com/document/d/user-research-findings/edit",
    createdBy: "david_kim@dlsu.edu.ph",
    createdAt: "2024-01-01T12:45:00Z",
    updatedAt: "2024-01-01T12:45:00Z",
    committeeId: "product",
    pinned: false,
    clicks: 78,
    lastClicked: "2024-01-16T10:30:00Z",
  },
  {
    id: "7",
    shortlink: "meetingnotes",
    longLink: "https://notion.so/team-meeting-notes-january",
    createdBy: "sean_robenta@dlsu.edu.ph",
    createdAt: "2023-12-28T16:00:00Z",
    updatedAt: "2024-01-11T09:20:00Z",
    committeeId: null,
    pinned: false,
    clicks: 45,
    lastClicked: "2024-01-15T14:00:00Z",
  },
  {
    id: "8",
    shortlink: "socialmedia",
    longLink: "https://buffer.com/publish/calendar/january-2024",
    createdBy: "maria_santos@dlsu.edu.ph",
    createdAt: "2023-12-25T10:15:00Z",
    updatedAt: "2023-12-25T10:15:00Z",
    committeeId: "marketing",
    pinned: false,
    clicks: 134,
    lastClicked: "2024-01-14T12:45:00Z",
  },
]
