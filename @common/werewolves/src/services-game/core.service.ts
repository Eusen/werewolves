import {Injectable} from '@angular/core';
import {AssetsService} from '../services/assets/assets.service';
import {PlatformService} from '../services/platform/platform.service';
import {FontService} from "../services/font/font.service";
import {RouterInterceptor} from '../services/router/router.interceptor';
import {CoverLoading, CoverLoadingStep, CoverService} from '../components/cover/cover.service';

import {UserService} from "./user/user.service";
import {UtilsService} from "../services/utils/utils.service";
import {FormService} from "../services/form/form.service";
import {ValidatorService} from "../services/form/validator.service";
import {HttpRequester} from "../services/request";
import {HeadService} from "../services/head/head.service";
import {NotifyService} from "../services/notify/notify.service";
import {ModelService} from "./model/model.service";
import {WebsocketClientFactory} from "../services/websocket/websocket.proxy";
import {MenuService} from "../services/menu/menu.service";

const serverUrl = 'http://192.168.0.108:9621/';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  R = buildR(this);

  constructor(
    public assets: AssetsService,
    public plt: PlatformService,
    public font: FontService,
    public form: FormService,
    public validator: ValidatorService,
    public http: HttpRequester,
    public head: HeadService,
    public notify: NotifyService,
    public ws: WebsocketClientFactory,
    public utils: UtilsService,
    public menu: MenuService,
    public router: RouterInterceptor,
    public cover: CoverService,
    public user: UserService,
    public model: ModelService,
  ) {
    const {R} = this;
    // 初始化字体
    font.installPair(R.font.material_icons);
    font.installPair(R.font.metal_mania);
    font.installPair(R.font.ma_shan_zheng);

    // 设置根字体
    font.setRootFontFamily(
      R.font.metal_mania.name,
      R.font.ma_shan_zheng.name,
    );

    // 拦截部分路由, 让它们以弹窗的形式展示
    router.wantedForward(R.routes.login);
    router.wantedForward(R.routes.logon);
    router.wantedForward(R.routes.player_profile(''));
    router.wantedForward(R.routes.room_list(''));
    router.wantedForward(R.routes.room('', ''));
    router.wantedForward(R.routes.settings);
    router.wantedForward(R.routes.settings_uwk);
    router.wantedForward(R.routes.mp_wk(''));

    router.wantedBackward((currentRoute, currentState, nextState) => {
      let isBackAble = true;

      if (currentState.url.includes(R.routes.home) && !nextState.url.startsWith('/game')) {
        isBackAble = false;
      }

      return isBackAble;
    });

    // 设置默认http请求服务器地址
    http.host = serverUrl;
  }

  createLoading(steps: CoverLoadingStep[]) {
    return new CoverLoading(steps);
  }

  stopEvent($event: Event) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  copyInviteUrl() {
  }
}

function buildR(core: CoreService) {
  const {assets, ws} = core;

  function googleFont(name: string) {
    return {name, url: assets.font(`/google/${name}/${name}.css`)};
  }

  return {
    ws: ws.create(serverUrl),
    server: assets.createAssets(serverUrl, {imgRoot: '', audioRoot: '', fontRoot: ''}),
    img: buildImages(assets),
    font: buildFonts(assets),
    audio: buildAudio(assets),
    routes: {
      login: '/auth/login',
      logon: '/auth/logon',
      home: '/game/home',
      room_list: (type) => `/game/room-list/${type}`,
      room: (type, id) => {
        if (!type) return `/game/room`;
        return `/game/room/${[type, id].join('/')}`;
      },
      mp_wk: (id) => `/game/mp-wk/${id}`,
      settings: '/game/settings',
      settings_uwk: '/game/settings-uwk',
      player_profile: (id) => `/game/player-profile/${id}`,
    }
  }
}

function buildImages(assets: AssetsService) {
  // images start
  return {
    achieves_crjh: assets.imgPair('/achieves/crjh.png'),
    avatar_default: assets.imgPair('/avatar/default.png'),
    avatar_frame_default: assets.imgPair('/avatar_frame/default.png'),
    avatar_frame_jnz: assets.imgPair('/avatar_frame/jnz.png'),
    card_kpbj: assets.imgPair('/card/kpbj.jpg'),
    card_kpqj: assets.imgPair('/card/kpqj.png'),
    enjoy_biy: assets.imgPair('/enjoy/biy.png'),
    enjoy_biz: assets.imgPair('/enjoy/biz.png'),
    enjoy_blo: assets.imgPair('/enjoy/blo.png'),
    enjoy_blp: assets.imgPair('/enjoy/blp.png'),
    enjoy_blq: assets.imgPair('/enjoy/blq.png'),
    enjoy_blr: assets.imgPair('/enjoy/blr.png'),
    enjoy_bls: assets.imgPair('/enjoy/bls.png'),
    enjoy_blt: assets.imgPair('/enjoy/blt.png'),
    enjoy_blu: assets.imgPair('/enjoy/blu.png'),
    enjoy_blv: assets.imgPair('/enjoy/blv.png'),
    enjoy_blw: assets.imgPair('/enjoy/blw.png'),
    enjoy_blx: assets.imgPair('/enjoy/blx.png'),
    enjoy_bly: assets.imgPair('/enjoy/bly.png'),
    enjoy_blz: assets.imgPair('/enjoy/blz.png'),
    enjoy_bm0: assets.imgPair('/enjoy/bm0.png'),
    enjoy_bm1: assets.imgPair('/enjoy/bm1.png'),
    enjoy_bm2: assets.imgPair('/enjoy/bm2.png'),
    enjoy_bm3: assets.imgPair('/enjoy/bm3.png'),
    enjoy_bm4: assets.imgPair('/enjoy/bm4.png'),
    enjoy_bm5: assets.imgPair('/enjoy/bm5.png'),
    enjoy_bm6: assets.imgPair('/enjoy/bm6.png'),
    enjoy_bm7: assets.imgPair('/enjoy/bm7.png'),
    enjoy_bm8: assets.imgPair('/enjoy/bm8.png'),
    enjoy_bm9: assets.imgPair('/enjoy/bm9.png'),
    enjoy_bma: assets.imgPair('/enjoy/bma.png'),
    enjoy_bmb: assets.imgPair('/enjoy/bmb.png'),
    enjoy_bmc: assets.imgPair('/enjoy/bmc.png'),
    enjoy_bmd: assets.imgPair('/enjoy/bmd.png'),
    enjoy_bme: assets.imgPair('/enjoy/bme.png'),
    enjoy_bmf: assets.imgPair('/enjoy/bmf.png'),
    enjoy_bmg: assets.imgPair('/enjoy/bmg.png'),
    enjoy_bmh: assets.imgPair('/enjoy/bmh.png'),
    enjoy_bmi: assets.imgPair('/enjoy/bmi.png'),
    enjoy_bmj: assets.imgPair('/enjoy/bmj.png'),
    enjoy_bmk: assets.imgPair('/enjoy/bmk.png'),
    enjoy_bml: assets.imgPair('/enjoy/bml.png'),
    enjoy_bmm: assets.imgPair('/enjoy/bmm.png'),
    enjoy_bmn: assets.imgPair('/enjoy/bmn.png'),
    enjoy_bmo: assets.imgPair('/enjoy/bmo.png'),
    enjoy_bmp: assets.imgPair('/enjoy/bmp.png'),
    enjoy_bmq: assets.imgPair('/enjoy/bmq.png'),
    enjoy_bmr: assets.imgPair('/enjoy/bmr.png'),
    enjoy_bms: assets.imgPair('/enjoy/bms.png'),
    enjoy_bmt: assets.imgPair('/enjoy/bmt.png'),
    enjoy_bmu: assets.imgPair('/enjoy/bmu.png'),
    enjoy_bmv: assets.imgPair('/enjoy/bmv.png'),
    enjoy_bmw: assets.imgPair('/enjoy/bmw.png'),
    enjoy_bmx: assets.imgPair('/enjoy/bmx.png'),
    enjoy_bmy: assets.imgPair('/enjoy/bmy.png'),
    enjoy_bmz: assets.imgPair('/enjoy/bmz.png'),
    enjoy_bm_: assets.imgPair('/enjoy/bm_.png'),
    enjoy_bn0: assets.imgPair('/enjoy/bn0.png'),
    enjoy_bn1: assets.imgPair('/enjoy/bn1.png'),
    enjoy_bn2: assets.imgPair('/enjoy/bn2.png'),
    enjoy_bn4: assets.imgPair('/enjoy/bn4.png'),
    enjoy_bn5: assets.imgPair('/enjoy/bn5.png'),
    enjoy_bn6: assets.imgPair('/enjoy/bn6.png'),
    enjoy_bn7: assets.imgPair('/enjoy/bn7.png'),
    enjoy_bn8: assets.imgPair('/enjoy/bn8.png'),
    enjoy_bnc: assets.imgPair('/enjoy/bnc.png'),
    enjoy_bnd: assets.imgPair('/enjoy/bnd.png'),
    enjoy_bne: assets.imgPair('/enjoy/bne.png'),
    enjoy_bnf: assets.imgPair('/enjoy/bnf.png'),
    enjoy_bng: assets.imgPair('/enjoy/bng.png'),
    enjoy_bnh: assets.imgPair('/enjoy/bnh.png'),
    enjoy_bni: assets.imgPair('/enjoy/bni.png'),
    enjoy_bnj: assets.imgPair('/enjoy/bnj.png'),
    enjoy_bnk: assets.imgPair('/enjoy/bnk.png'),
    enjoy_bnl: assets.imgPair('/enjoy/bnl.png'),
    enjoy_bnm: assets.imgPair('/enjoy/bnm.png'),
    enjoy_bn_: assets.imgPair('/enjoy/bn_.png'),
    enjoy_bo1: assets.imgPair('/enjoy/bo1.png'),
    enjoy_boj: assets.imgPair('/enjoy/boj.png'),
    enjoy_bom: assets.imgPair('/enjoy/bom.png'),
    enjoy_bon: assets.imgPair('/enjoy/bon.png'),
    enjoy_boo: assets.imgPair('/enjoy/boo.png'),
    enjoy_bop: assets.imgPair('/enjoy/bop.png'),
    enjoy_boq: assets.imgPair('/enjoy/boq.png'),
    enjoy_bor: assets.imgPair('/enjoy/bor.png'),
    enjoy_bos: assets.imgPair('/enjoy/bos.png'),
    enjoy_bot: assets.imgPair('/enjoy/bot.png'),
    enjoy_bou: assets.imgPair('/enjoy/bou.png'),
    enjoy_bov: assets.imgPair('/enjoy/bov.png'),
    enjoy_bow: assets.imgPair('/enjoy/bow.png'),
    enjoy_box: assets.imgPair('/enjoy/box.png'),
    enjoy_bp8: assets.imgPair('/enjoy/bp8.png'),
    enjoy_bp9: assets.imgPair('/enjoy/bp9.png'),
    enjoy_bpa: assets.imgPair('/enjoy/bpa.png'),
    enjoy_bpb: assets.imgPair('/enjoy/bpb.png'),
    enjoy_bpc: assets.imgPair('/enjoy/bpc.png'),
    enjoy_bpd: assets.imgPair('/enjoy/bpd.png'),
    enjoy_bpe: assets.imgPair('/enjoy/bpe.png'),
    enjoy_bpf: assets.imgPair('/enjoy/bpf.png'),
    enjoy_bpg: assets.imgPair('/enjoy/bpg.png'),
    enjoy_bph: assets.imgPair('/enjoy/bph.png'),
    enjoy_bpi: assets.imgPair('/enjoy/bpi.png'),
    enjoy_bpj: assets.imgPair('/enjoy/bpj.png'),
    enjoy_bpk: assets.imgPair('/enjoy/bpk.png'),
    enjoy_bpl: assets.imgPair('/enjoy/bpl.png'),
    enjoy_bpm: assets.imgPair('/enjoy/bpm.png'),
    enjoy_bpn: assets.imgPair('/enjoy/bpn.png'),
    enjoy_bpo: assets.imgPair('/enjoy/bpo.png'),
    enjoy_bpp: assets.imgPair('/enjoy/bpp.png'),
    enjoy_bpq: assets.imgPair('/enjoy/bpq.png'),
    enjoy_bpr: assets.imgPair('/enjoy/bpr.png'),
    enjoy_bps: assets.imgPair('/enjoy/bps.png'),
    enjoy_bpt: assets.imgPair('/enjoy/bpt.png'),
    enjoy_bpu: assets.imgPair('/enjoy/bpu.png'),
    enjoy_bpv: assets.imgPair('/enjoy/bpv.png'),
    enjoy_bpw: assets.imgPair('/enjoy/bpw.png'),
    enjoy_bpx: assets.imgPair('/enjoy/bpx.png'),
    enjoy_bpy: assets.imgPair('/enjoy/bpy.png'),
    enjoy_bpz: assets.imgPair('/enjoy/bpz.png'),
    game_bg_jd: assets.imgPair('/game/bg_jd.png'),
    game_bg_xd: assets.imgPair('/game/bg_xd.png'),
    game_bg_xg: assets.imgPair('/game/bg_xg.png'),
    game_bg_zy_b: assets.imgPair('/game/bg_zy_b.jpg'),
    game_bg_zy_y: assets.imgPair('/game/bg_zy_y.png'),
    logo: assets.imgPair('/logo.png'),
    logo_full: assets.imgPair('/logo_full.png'),
    logo_text: assets.imgPair('/logo_text.png'),
    master_panel_bg: assets.imgPair('/master_panel_bg.jpg'),
    portrait_lmr: assets.imgPair('/portrait/lmr.png'),
    portrait_pm_f: assets.imgPair('/portrait/pm_f.png'),
    portrait_pm_m: assets.imgPair('/portrait/pm_m.png'),
    roles_alz: assets.imgPair('/roles/alz.png'),
    roles_bc: assets.imgPair('/roles/bc.png'),
    roles_blw: assets.imgPair('/roles/blw.png'),
    roles_dz: assets.imgPair('/roles/dz.png'),
    roles_elqs: assets.imgPair('/roles/elqs.png'),
    roles_emzy: assets.imgPair('/roles/emzy.png'),
    roles_jz: assets.imgPair('/roles/jz.png'),
    roles_langr: assets.imgPair('/roles/langr.png'),
    roles_liemr: assets.imgPair('/roles/liemr.png'),
    roles_llm: assets.imgPair('/roles/llm.png'),
    roles_lmr: assets.imgPair('/roles/lmr.png'),
    roles_lr: assets.imgPair('/roles/lr.png'),
    roles_lw: assets.imgPair('/roles/lw.png'),
    roles_mss: assets.imgPair('/roles/mss.png'),
    roles_nw: assets.imgPair('/roles/nw.png'),
    roles_pm: assets.imgPair('/roles/pm.png'),
    roles_qbt: assets.imgPair('/roles/qbt.png'),
    roles_qs: assets.imgPair('/roles/qs.png'),
    roles_smr: assets.imgPair('/roles/smr.png'),
    roles_smz: assets.imgPair('/roles/smz.png'),
    roles_sw: assets.imgPair('/roles/sw.png'),
    roles_sxg: assets.imgPair('/roles/sxg.png'),
    roles_wy: assets.imgPair('/roles/wy.png'),
    roles_xyst: assets.imgPair('/roles/xyst.png'),
    roles_yl: assets.imgPair('/roles/yl.png'),
    roles_yyj: assets.imgPair('/roles/yyj.png'),
    ui_btn_bg: assets.imgPair('/ui/btn_bg.png'),
    ui_cover: assets.imgPair('/ui/cover.jpg'),
    ui_cover_back: assets.imgPair('/ui/cover_back.jpg'),
    ui_dz_0: assets.imgPair('/ui/dz_0.png'),
    ui_dz_1: assets.imgPair('/ui/dz_1.png'),
    ui_f_0: assets.imgPair('/ui/f_0.png'),
    ui_gold_man: assets.imgPair('/ui/gold_man.png'),
    ui_gold_woman: assets.imgPair('/ui/gold_woman.png'),
    ui_grade_1: assets.imgPair('/ui/grade_1.png'),
    ui_grade_2: assets.imgPair('/ui/grade_2.png'),
    ui_grade_3: assets.imgPair('/ui/grade_3.png'),
    ui_grade_mvp: assets.imgPair('/ui/grade_mvp.png'),
    ui_gz: assets.imgPair('/ui/gz.png'),
    ui_g_man: assets.imgPair('/ui/g_man.png'),
    ui_g_woman: assets.imgPair('/ui/g_woman.png'),
    ui_hgd_1: assets.imgPair('/ui/hgd_1.png'),
    ui_hgd_2: assets.imgPair('/ui/hgd_2.png'),
    ui_hgd_3: assets.imgPair('/ui/hgd_3.png'),
    ui_hgd_4: assets.imgPair('/ui/hgd_4.png'),
    ui_hgd_5: assets.imgPair('/ui/hgd_5.png'),
    ui_hgd_6: assets.imgPair('/ui/hgd_6.png'),
    ui_hgd_7: assets.imgPair('/ui/hgd_7.png'),
    ui_hzs: assets.imgPair('/ui/hzs.png'),
    ui_h_0: assets.imgPair('/ui/h_0.png'),
    ui_h_1: assets.imgPair('/ui/h_1.png'),
    ui_h_2: assets.imgPair('/ui/h_2.png'),
    ui_jb: assets.imgPair('/ui/jb.png'),
    ui_score_1: assets.imgPair('/ui/score_1.png'),
    ui_score_2: assets.imgPair('/ui/score_2.png'),
    ui_score_3: assets.imgPair('/ui/score_3.png'),
    ui_score_4: assets.imgPair('/ui/score_4.png'),
    ui_score_5: assets.imgPair('/ui/score_5.png'),
    ui_seg_1: assets.imgPair('/ui/seg_1.png'),
    ui_seg_2: assets.imgPair('/ui/seg_2.png'),
    ui_seg_3: assets.imgPair('/ui/seg_3.png'),
    ui_seg_4: assets.imgPair('/ui/seg_4.png'),
    ui_seg_5: assets.imgPair('/ui/seg_5.png'),
    ui_seg_6: assets.imgPair('/ui/seg_6.png'),
    ui_seg_7: assets.imgPair('/ui/seg_7.png'),
    ui_seg_8: assets.imgPair('/ui/seg_8.png'),
    ui_star_0: assets.imgPair('/ui/star_0.png'),
    ui_star_1: assets.imgPair('/ui/star_1.png'),
    ui_title: assets.imgPair('/ui/title.png'),
    ui_vip: assets.imgPair('/ui/vip.png'),
    ui_vip_s: assets.imgPair('/ui/vip_s.png'),
    ui_xd: assets.imgPair('/ui/xd.png'),
    ui_xh_0: assets.imgPair('/ui/xh_0.png'),
    ui_xh_1: assets.imgPair('/ui/xh_1.png'),
    ui_zs: assets.imgPair('/ui/zs.png')
  };
  // images end
}

function buildFonts(assets: AssetsService) {
  // fonts start
  return {
    marcellus_sc: {name: 'marcellus_sc', url: assets.font('/google/marcellus_sc/marcellus_sc.css')},
    material_icons: {name: 'material_icons', url: assets.font('/google/material_icons/material_icons.css')},
    ma_shan_zheng: {name: 'ma_shan_zheng', url: assets.font('/google/ma_shan_zheng/ma_shan_zheng.css')},
    metal_mania: {name: 'metal_mania', url: assets.font('/google/metal_mania/metal_mania.css')},
    noto_sans_sc: {name: 'noto_sans_sc', url: assets.font('/google/noto_sans_sc/noto_sans_sc.css')},
    pacifico: {name: 'pacifico', url: assets.font('/google/pacifico/pacifico.css')},
    piedra: {name: 'piedra', url: assets.font('/google/piedra/piedra.css')},
    special_elite: {name: 'special_elite', url: assets.font('/google/special_elite/special_elite.css')},
    zcool_kuaile: {name: 'zcool_kuaile', url: assets.font('/google/zcool_kuaile/zcool_kuaile.css')},
    zcool_qingke_huangyou: {name: 'zcool_qingke_huangyou', url: assets.font('/google/zcool_qingke_huangyou/zcool_qingke_huangyou.css')},
    zcool_xiaowei: {name: 'zcool_xiaowei', url: assets.font('/google/zcool_xiaowei/zcool_xiaowei.css')}
  };
  // fonts end
}

function buildAudio(assets: AssetsService) {
  // audios start
  return {
    close: assets.audio('/close.wav'),
    open: assets.audio('/open.wav')
  };
  // audios end
}
