import * as Colyseus from 'colyseus';
import accountManager from './accountManager';
import { AccountClientData } from './account';

const login = Colyseus.createEndpoint("/api/login", {
    method: "POST",
    disableBody: true
}, async (ctx): Promise<unknown> => {
    const formData = await ctx.request.formData();
    try {
        ctx.setCookie("token", await accountManager.login(
            formData.get("username") as string,
            formData.get("password") as string
        ));
        return ctx.redirect("/");
    } catch (e) {
        return ctx.redirect("/login/error");
    }
});

const createAccount = Colyseus.createEndpoint("/api/createAccount", {
    method: "POST",
    disableBody: true
}, async (ctx): Promise<unknown> => {
    const formData = await ctx.request.formData();
    await accountManager.addAccount(
        formData.get("username") as string,
        formData.get("password") as string
    );
    return ctx.redirect("/login");
});

const userData = Colyseus.createEndpoint("/api/userData", {
    method: "GET",
    disableBody: true
}, async (ctx): Promise<unknown> => {
    const token = ctx.getCookie("token");
    if (!token) return ctx.json({ loggedIn: false });
    const account: AccountClientData & { loggedIn?: boolean } = await accountManager.getUserData(token);
    account.loggedIn = true;
    return await ctx.json(account);
});

export default Colyseus.createRouter({
    login,
    createAccount,
    userData,
});