import * as Colyseus from 'colyseus';
import accountManager from './accountManager';

const login = Colyseus.createEndpoint("/api/login", {
    method: "POST",
    disableBody: true
}, async (ctx): Promise<{ token: string }> => {
    const formData = await ctx.request.formData();
    //ctx.redirect("/");
    return { token: await accountManager.login(formData.get("username") as string, formData.get("password") as string) };
}
);

export default Colyseus.createRouter({
    login,
});