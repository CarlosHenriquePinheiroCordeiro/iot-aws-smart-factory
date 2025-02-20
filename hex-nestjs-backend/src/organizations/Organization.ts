export class Organization {
    
    constructor(
        private id: string,
        private name: string,
        private number: number | undefined,
        private street: string,
        private city: string,
        private state: string,
        private country: string,
        private logoUrl: string | undefined,
    ) {
        this.setId(id);
        this.setName(name);
        this.setNumber(number);
        this.setStreet(street);
        this.setCity(city)
        this.setState(state);
        this.setCountry(country);
        this.setLogoUrl(logoUrl);
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getNumber(): number | undefined {
        return this.number;
    }

    public getStreet(): string {
        return this.street;
    }

    public getCity(): string {
        return this.city;
    }

    public getState(): string {
        return this.state;
    }

    public getCountry(): string {
        return this.country;
    }

    public getLogoUrl(): string | undefined {
        return this.logoUrl;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setNumber(number: number | undefined): void {
        this.number = number;
    }

    public setStreet(street: string): void {
        this.street = street;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public setLogoUrl(logoUrl: string | undefined): void {
        this.logoUrl = logoUrl;
    }
  
    
  }
  