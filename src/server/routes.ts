import * as Colyseus from 'colyseus';
import accountManager from './accountManager';
import { AccountClientData } from './account';
import ormDataSource from './ormDataSource';
import Adventure from './adventure';

const login = Colyseus.createEndpoint("/login", {
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

const createAccount = Colyseus.createEndpoint("/createAccount", {
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

const createAdventure = Colyseus.createEndpoint("/createAdventure", {
    method: "POST",
    disableBody: true
}, async (ctx): Promise<unknown> => {
    const token = ctx.getCookie("token");
    if (!token) return ctx.error("FORBIDDEN");
    const formData = await ctx.request.formData();
    const userId = await accountManager.getUserId(token);
    await accountManager.createAdventure(userId, formData.get("name") as string);
    return ctx.redirect("/");
});

const userData = Colyseus.createEndpoint("/userData", {
    method: "GET",
    disableBody: true
}, async (ctx): Promise<unknown> => {
    const token = ctx.getCookie("token");
    if (!token) return ctx.json({ loggedIn: false });
    const account: AccountClientData & { loggedIn?: boolean } = await accountManager.getUserData(token);
    if (!account) return ctx.json({ loggedIn: false });
    account.loggedIn = true;
    return ctx.json(account);
});

const adventureData = Colyseus.createEndpoint("/adventureData", {
    method: "PUT",
}, async (ctx): Promise<unknown> => {
    return ctx.json((await ormDataSource.manager.findOneBy(Adventure, { id: ctx.body })).asClientData());
});

const logout = Colyseus.createEndpoint("/logout", {
    method: "GET",
    disableBody: true
}, async (ctx): Promise<unknown> => {
    const token = ctx.getCookie("token");
    if (!token) return ctx.redirect("/");
    await accountManager.logout(token);
    ctx.setCookie("token", null);
    return ctx.redirect("/");
});

export default Colyseus.createRouter({
    login,
    createAccount,
    createAdventure,
    adventureData,
    userData,
    logout
});