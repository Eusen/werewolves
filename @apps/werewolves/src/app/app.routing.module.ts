import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RouterInterceptor} from "@common/werewolves";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RouterInterceptor],
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'logon',
            loadChildren: () => import('../pages/玩家/注册/注册.module').then(m => m.PlayerLogonPageModule),
          },
          {
            path: 'login',
            loadChildren: () => import('../pages/玩家/登录/登录.module').then(m => m.PlayerLoginPageModule),
          },
        ]
      },
      {
        path: 'game',
        children: [
          {
            path: 'home',
            canDeactivate: [RouterInterceptor],
            loadChildren: () => import('../pages/主页/主页.module').then(m => m.HomePageModule),
          },
          {
            path: 'room-list/:type',
            loadChildren: () => import('../pages/游戏/游戏房间列表/游戏房间列表.module').then(m => m.GameRoomListModule),
          },
          {
            path: 'room/:type/:id',
            loadChildren: () => import('../pages/游戏/游戏房间/游戏房间.module').then(m => m.GameRoomModule),
          },
          {
            path: 'mp-wk/:id',
            loadChildren: () => import('../pages/游戏/游戏主程/狼人杀主程/狼人杀主程.module').then(m => m.WKMainProgramModule),
          },
          {
            path: 'settings-uwk',
            loadChildren: () => import('../pages/游戏/游戏设置/一夜终极狼人杀设置/一夜终极狼人杀设置.module').then(m => m.UwkSettingsModule),
          },
          {
            path: 'settings',
            loadChildren: () => import('../pages/玩家/设置/设置.module').then(m => m.PlayerSettingsPageModule),
          },
          {
            path: 'player-profile/:id',
            loadChildren: () => import('../pages/玩家/个人资料/个人资料.module').then(m => m.PlayerProfileModule),
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
