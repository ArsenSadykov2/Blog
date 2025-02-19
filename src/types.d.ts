export interface BlogPost {
    id: number;
    title: string;
    author: string;
}

export interface ApiPost {
    userId: number,
    id: number,
    title: string,
    body: string,
}

export interface ApiUsers {
    id: number;
    name: string;
    email: string;
    username: string;
}