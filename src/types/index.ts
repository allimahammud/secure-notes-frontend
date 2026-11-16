export type User = { id: string; _id?: string; name: string; email: string; role: 'user'|'admin'; interests?: string[] };
export type Note = { _id: string; title: string; content: string; owner: User|string; createdAt: string };
export type PageResult<T> = { items: T[]; pagination: { page: number; limit: number; total: number; pages: number } };
