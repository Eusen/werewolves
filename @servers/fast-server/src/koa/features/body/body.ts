import * as Koa from 'koa';
import * as KoaBody from 'koa-body';
import * as KoaStatic from "koa-static";
import * as KoaRouter from "koa-router";
import * as KoaMount from "koa-mount";
import {Responser} from '../response/response.def';
import {$path, $fs} from '../../../utils/node.utils';

export interface KoaStaticOptions {
  maxage?: number; // Browser cache max-age in milliseconds. defaults to 0
  hidden?: boolean; // Allow transfer of hidden files. defaults to false
  index?: string; // Default file name, defaults to 'index.html'
  defer?: boolean; // If true, serves after return next(), allowing any downstream middleware to respond first.
  gzip?: boolean; // Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
  br?: boolean; // Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.
  setHeaders?: Function; // to set custom headers on response.
  extensions?: boolean; // Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
}

export interface KoaBodyOptions extends KoaBody.IKoaBodyOptions {
  static?: KoaStaticOptions;
}

export class KoaBodyProxy {
  static create(koa: Koa, options: KoaBodyOptions) {
    return new KoaBodyProxy(koa, options);
  }

  protected constructor(koa: Koa, options: KoaBodyOptions) {
    if (options.formidable) {
      options.multipart = true;
      let isMkdir = false;
      options.formidable.onFileBegin = (name, file) => {
        const rootDir = $path.dirname(file.path);
        if (!isMkdir) {
          $fs.mkdirSync(rootDir, {recursive: true});
          isMkdir = true;
        }
      }
      koa.use(KoaMount('/files/', KoaStatic(options.formidable.uploadDir, options.static)));
    }

    koa.use(KoaBody(options));
  }

  getRouter() {
    const router = new KoaRouter();

    router.post('/upload', async (context, next) => {
      const fileKeys = Object.keys(context.request.files);
      if (fileKeys.length > 0) {
        const paths = fileKeys.map(key => {
          const file = context.request.files[key];
          return $path.join('files', $path.basename(file.path)).replace(/\\/g, '/');
        });

        Responser.ok(context, {
          statusCode: 200,
          message: '上传成功',
          data: paths
        });
      } else {
        Responser.throw(context, {
          statusCode: 404,
          message: '传入文件为空'
        });
      }
    });

    return router;
  }
}
