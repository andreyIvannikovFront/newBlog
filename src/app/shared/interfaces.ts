export interface Environment {
    apiKey: string;
    production: boolean;
    fbUrl: string;
};

export interface Post {
    title: string;
    id?: string;
    author: string;
    date: Date;
    content: string;
}
export interface FbAuthResponse {
  expiresIn: string;
  idToken: string;
};
