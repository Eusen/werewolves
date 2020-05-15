import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RouterInterceptor} from '../services/router/router.interceptor';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RouterInterceptor],
    children: [
      {
        path: 'game-player',
        children: [
          {
            path: 'logon',
            loadChildren: () => import('./pages/玩家/注册/注册.module').then(m => m.PlayerLogonPageModule),
          },
          {
            path: 'login',
            loadChildren: () => import('./pages/玩家/登录/登录.module').then(m => m.PlayerLoginPageModule),
          },
          {
            path: 'settings',
            loadChildren: () => import('./pages/玩家/设置/设置.module').then(m => m.PlayerSettingsPageModule),
          },
        ]
      },
      {
        path: 'game',
        children: [
          {
            path: 'main-program',
            loadChildren: () => import('./games/游戏主程/游戏主程.module').then(m => m.GameMainProgramModule),
          },
          {
            path: 'prepare-room',
            loadChildren: () => import('./games/预备大厅/预备大厅.module').then(m => m.PrepareRoomPageModule),
          },
          {
            path: 'settings',
            children: [
              {
                path: 'ultimate-night',
                loadChildren: () => import('./games/游戏设置/一夜终极/一夜终极.module').then(m => m.UltimateNightSettingsPageModule),
              },
            ]
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
