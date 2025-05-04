export class News {
  title: string;
  description: string;
  url: string;
  geminiDescription: string;

  constructor(title: string, description: string, url: string, geminiDescription: string) {
    this.title = title;
    this.description = description;
    this.url = url;
    this.geminiDescription = geminiDescription;
  }
}
