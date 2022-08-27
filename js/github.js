class Github {
    constructor() {
        this.client_id = " 6c1d8350e8589e10192c";
        this.secret_id = "bbdd63f7a1e75db9acb60f9df651d5c3853cfdeb";
    }
    async getUsers(user) {
        //USER IS INPUT FROM USER
        const response = await fetch(`https://api.github.com/users/${user}`);
        const repo = await fetch(
            `https://api.github.com/users/${user}/repos?per_page=5&sort='created: asc'`
        );
        const profileData = await response.json();
        const repos = await repo.json();
        return {
            profile: profileData,
            repos,
        };
    }
}