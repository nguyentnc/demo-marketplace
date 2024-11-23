// SESSION_NOT_EXISTED

import { Router } from 'next/router';

export enum ERouteChangeCompleteType {
  SESSION_NOT_EXISTED,
}

export function emitSessionExpired() {
  Router.events.emit('routeChangeComplete', {
    type: ERouteChangeCompleteType.SESSION_NOT_EXISTED,
  });
}
