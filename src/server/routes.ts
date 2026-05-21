import * as Colyseus from 'colyseus';
import accountManager from './accountManager';

const login = Colyseus.createEndpoint("/api/login", {
    method: "POST",
    disableBody: true
}, async (ctx): Promise<unknown> => {
    const formData = await ctx.request.formData();
    try {
        ctx.setCookie("token", await accountManager.login(formData.get("username") as string, formData.get("password") as string));
        return ctx.redirect("/");
    } catch (e) {
        return ctx.redirect("/login/error");
    }
}
);

export default Colyseus.createRouter({
    login,
});