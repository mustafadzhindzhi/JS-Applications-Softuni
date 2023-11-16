import * as authService from '../services/authService.js'

export const authMiddleWare = (ctx, next) => {
    ctx.user = authService.getUser();

    next();
}