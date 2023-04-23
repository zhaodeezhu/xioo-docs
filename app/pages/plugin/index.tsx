import React, { useEffect, useRef, useState } from 'react';
import Engine, { EngineInterface, View, ViewInterface } from '@aomao/engine';
import Bold from '@aomao/plugin-bold';
import CodeBlock, { CodeBlockComponent } from '@aomao/plugin-codeblock';
import Toolbar, { ToolbarPlugin, ToolbarComponent } from '@aomao/toolbar';
import Heading from '@aomao/plugin-heading';
import Alignment from '@aomao/plugin-alignment';
import Backcolor from '@aomao/plugin-backcolor';
import Code from '@aomao/plugin-code';
import Embed, { EmbedComponent } from '@aomao/plugin-embed';
import Table, { TableComponent } from '@aomao/plugin-table';
import Fontcolor from '@aomao/plugin-fontcolor';
import Fontsize from '@aomao/plugin-fontsize';
import Fontfamily from '@aomao/plugin-fontfamily';
import Hr, { HrComponent } from '@aomao/plugin-hr';
import Drawio, { DrawioComponent } from './components/Draw';
import Indent from '@aomao/plugin-indent';
import Link from '@aomao/plugin-link';
import Lineheight from '@aomao/plugin-line-height';
import Math, { MathComponent } from '@aomao/plugin-math';
import Paintformat from '@aomao/plugin-paintformat';
import Quote from '@aomao/plugin-quote';
import Redo from '@aomao/plugin-redo';
import Undo from '@aomao/plugin-undo';
import Removeformat from '@aomao/plugin-removeformat';
import Orderedlist from '@aomao/plugin-orderedlist';
import Selectall from '@aomao/plugin-selectall';
import Strikethrough from '@aomao/plugin-strikethrough';
import Status, { StatusComponent } from '@aomao/plugin-status';
import Sub from '@aomao/plugin-sub';
import Sup from '@aomao/plugin-sup';
import Tasklist, { CheckboxComponent } from '@aomao/plugin-tasklist';
import Underline from '@aomao/plugin-underline';
import Unorderedlist from '@aomao/plugin-unorderedlist';

import Video, { VideoComponent, VideoUploader } from '@aomao/plugin-video';

import Image, { ImageComponent, ImageUploader } from '@aomao/plugin-image';
import File, { FileComponent, FileUploader } from '@aomao/plugin-file';

// @ts-ignore
// import IconWorkflow from './workflow.png';

import './index.less';

const WorkflowIcon = () => {

  return (
    <div className="workflow-icon">
      {/* @ts-ignore */}
      <svg style={{ height: '100%', width: '100%' }} t="1646019794667" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4257" data-spm-anchor-id="a313x.7781069.0.i7" width="200" height="200"><path d="M149.333333 661.333333h213.333334v213.333334H149.333333zM753.066667 411.733333l-119.466667-119.466666c-8.533333-8.533333-8.533333-21.333333 0-29.866667l119.466667-119.466667c8.533333-8.533333 21.333333-8.533333 29.866666 0l119.466667 119.466667c8.533333 8.533333 8.533333 21.333333 0 29.866667l-119.466667 119.466666c-8.533333 8.533333-21.333333 8.533333-29.866666 0z" fill="#71D19A" p-id="4258" data-spm-anchor-id="a313x.7781069.0.i2" className=""></path><path d="M256 277.333333m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#707070" p-id="4259" data-spm-anchor-id="a313x.7781069.0.i1" className="selected"></path><path d="M768 768m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#707070" p-id="4260" data-spm-anchor-id="a313x.7781069.0.i13" className="selected"></path><path d="M234.666667 512h42.666666v106.666667h-42.666666z" fill="#90A4AE" p-id="4261"></path><path d="M256 448l-64 85.333333h128z" fill="#90A4AE" p-id="4262"></path><path d="M426.666667 256h106.666666v42.666667h-106.666666z" fill="#90A4AE" p-id="4263"></path><path d="M597.333333 277.333333l-85.333333-64v128z" fill="#90A4AE" p-id="4264"></path><path d="M746.666667 448h42.666666v106.666667h-42.666666z" fill="#90A4AE" p-id="4265"></path><path d="M768 618.666667l64-85.333334h-128z" fill="#90A4AE" p-id="4266"></path></svg>
    </div>
  )
}

const ReadWriteIcon = () => {
  return <span className="iconfont icon-a-53-biaoqian"></span>
}

const plugins = [
  CodeBlock,
  Bold,
  ToolbarPlugin,
  Table,
  Heading,
  Alignment,
  Backcolor,
  Code,
  Embed,
  Fontcolor,
  Fontsize,
  Fontfamily,
  Drawio,
  Hr,
  Indent,
  Link,
  Lineheight,
  Math,
  Paintformat,
  Quote,
  Redo,
  Undo,
  Removeformat,
  Orderedlist,
  Selectall,
  Strikethrough,
  Status,
  Sub,
  Sup,
  Tasklist,
  Underline,
  Unorderedlist,
  Image,
  ImageUploader,
  File,
  FileUploader,
  Video,
  VideoUploader
]

const configs = {}

const cards = [
  CodeBlockComponent,
  ToolbarComponent,
  TableComponent,
  TableComponent,
  EmbedComponent,
  DrawioComponent,
  MathComponent,
  StatusComponent,
  CheckboxComponent,
  ImageComponent,
  FileComponent,
  VideoComponent,
  HrComponent
]

const EngineDemo = () => {
  //编辑器容器
  const ref = useRef<HTMLDivElement | null>(null);
  //引擎实例
  const [engine, setEngine] = useState<EngineInterface>();
  //编辑器内容
  const [content, setContent] = useState<string>(
    'hello word',
  );
  /** drawio正在加载中 */
  const [drawLoading, setDrawLoading] = useState<boolean>(true);

  const [drawVisible, setDrawVisible] = useState<boolean>(false);
  const currentEngine = useRef<Engine>();
  const currentXmlData = useRef<any>(null);
  const handleMessage = useRef((e) => {
    const data = e.data || {};
    if (data.type === 'drawio') {
      // 图的信息
      const ioData = data.data;
      // currentEngine.current.command.execute('drawio', ioData);

      // // 编辑
      if (currentXmlData.current) {
        const card = currentEngine.current.card.getSingleSelectedCard(currentEngine.current.change.range.get());
        console.log(card);
        currentEngine.current.card.remove(card.root);
        currentEngine.current.command.execute('drawio', ioData);
        // currentEngine.current.card.replace(card, 'drawio', ioData);
      } else {
        // 新增
        currentEngine.current.command.execute('drawio', ioData);
      }
      setDrawVisible(false);
    }
    if (data.type === 'drawio-cancel') {
      setDrawVisible(false);
    }
  })
  const DrawioFrame = useRef<any>();

  const handleEdit = useRef((e) => {
    const data = e.detail.xml;
    currentXmlData.current = data;
    console.log(data);
    const card = currentEngine.current.card.getSingleSelectedCard(currentEngine.current.change.range.get());
    if (!card) {
      return;
    }
    console.log(card);
    // currentEngine.current.card.remove(card.root);
    // currentEngine.current.card.removeNode(card)
    console.log(card);
    DrawioFrame.current.contentWindow.postMessage({
      type: 'edit',
      xml: currentXmlData.current,
      title: '测试.html'
    }, '*')
    setDrawVisible(true);
  })

  useEffect(() => {
    if (!ref.current) return;
    //实例化引擎
    const engine = new Engine(ref.current, {
      plugins: plugins,
      cards: cards,
      config: configs,
      // readonly: true
    });
    // console.log(engine.)
    //设置编辑器值
    // engine.setValue(`<p data-id="pd157317-lIg6OTX8">hello word</p><card type="block" name="hr" editable="false" value="data:%7B%22id%22%3A%228ppMs%22%2C%22type%22%3A%22block%22%7D"></card><p data-id="pd157317-HMCt7nxR"><br /></p>`);
    //监听编辑器值改变事件

    engine.on('change', (e) => {
      const value = engine.getValue();
      setContent(value)
      // console.log(`value:${value}`);
    });
    setTimeout(() => {
      // window['GraphViewer'].processElements();
    }, 100)
    // engine.setValue(`<card type="block" name="drawio" editable="false" value="data:%7B%22data%22%3A%22%7B%26quot%3Bhighlight%26quot%3B%3A%26quot%3B%230000ff%26quot%3B%2C%26quot%3Bnav%26quot%3B%3Atrue%2C%26quot%3Bresize%26quot%3B%3Atrue%2C%26quot%3Bxml%26quot%3B%3A%26quot%3B%26lt%3Bmxfile%20host%3D%5C%5C%26quot%3Bdrawio.xiooshow.com%5C%5C%26quot%3B%20modified%3D%5C%5C%26quot%3B2022-04-05T02%3A46%3A33.277Z%5C%5C%26quot%3B%20agent%3D%5C%5C%26quot%3B5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F99.0.4844.84%20Safari%2F537.36%5C%5C%26quot%3B%20etag%3D%5C%5C%26quot%3BNefVZ_gNv1VrF86LQISO%5C%5C%26quot%3B%20version%3D%5C%5C%26quot%3B16.5.6%5C%5C%26quot%3B%20type%3D%5C%5C%26quot%3Bdevice%5C%5C%26quot%3B%26gt%3B%26lt%3Bdiagram%20id%3D%5C%5C%26quot%3B5mNoF0H2RYBwVhFh1BAY%5C%5C%26quot%3B%20name%3D%5C%5C%26quot%3B%E7%AC%AC%201%20%E9%A1%B5%5C%5C%26quot%3B%26gt%3BtZRNb5wwEIZ%2FDcdWYO9H9prNtk2Vj6p7SHv04gm4MQwyZoH%2B%2Bpr1AItQNq2UShyYxzP2%2BH1tB3ybNZ%2BNKNJ7lKADFsom4DcBY9GCsaD7Qtl6sggXHiRGSUoawV79BoIh0UpJKCeJFlFbVUxhjHkOsZ0wYQzW07Rn1NNVC5HADOxjoef0SUmbenrF1iP%2FAipJ%2B5Wj1caPZKJPpp2UqZBYnyG%2BC%2FjWIFr%2FlzVb0J14vS6%2B7tMro0NjBnL7NwWr5fP14WGz%2FhpydvukH8vd9%2BwDp95s228YpNs%2FhWhsignmQu9Gem2wyiV0s4YuGnPuEAsHIwd%2FgbUtmSkqiw6lNtM06ho27Y%2Bu%2FmPE%2B%2FjnKV6v%2B%2FimoQV81J5H38CoDCwYgn4TXeevakOoxMrEcEGQ%2FowJk4C9kMcGB93RB3TdmNbVGdDCquO0D0FnMBnyRpvcDzn1D67RvEehK1ppZqM7bUX3G7daObdMp3OdKgv7QpwEqN19ndpy8L7eHQYg4pfk5PZjZd00QLz0xkbLQfojGAvNZfHnYvUFnG5I2z8aFNfjhVsRSs%2Fu2lX4n%2BRlb8vrZnEvUHcbBqE1VvJtkd9Br%2BViqtdmLlfE3kcvF44P1Gns7Jnnuz8%3D%26lt%3B%2Fdiagram%26gt%3B%26lt%3B%2Fmxfile%26gt%3B%26quot%3B%2C%26quot%3Btoolbar%26quot%3B%3A%26quot%3Bpages%20zoom%20layers%20lightbox%26quot%3B%2C%26quot%3Bpage%26quot%3B%3A0%7D%22%2C%22id%22%3A%2226zYO%22%2C%22type%22%3A%22block%22%7D"></card>`)
    engine.setValue(`<p data-id="pd157317-nl0P2bX9">​<a target="_blank" href="https://github.com/zhaodeezhu/xioo-docs">​github xioo-docs​</a>​</p><p data-id="pd157317-9ZfcdbGH"><cursor /><br /></p><card type="block" name="drawio" value="data:%7B%22data%22%3A%22%7B%26quot%3Bhighlight%26quot%3B%3A%26quot%3B%230000ff%26quot%3B%2C%26quot%3Bnav%26quot%3B%3Atrue%2C%26quot%3Bresize%26quot%3B%3Atrue%2C%26quot%3Bxml%26quot%3B%3A%26quot%3B%26lt%3Bmxfile%20host%3D%5C%5C%26quot%3Bdrawio.xiooshow.com%5C%5C%26quot%3B%20modified%3D%5C%5C%26quot%3B2022-04-06T09%3A04%3A52.571Z%5C%5C%26quot%3B%20agent%3D%5C%5C%26quot%3B5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F99.0.4844.84%20Safari%2F537.36%5C%5C%26quot%3B%20etag%3D%5C%5C%26quot%3Beo6NW-VS5gPBnZmB8mXx%5C%5C%26quot%3B%20version%3D%5C%5C%26quot%3B16.5.6%5C%5C%26quot%3B%20type%3D%5C%5C%26quot%3Bdevice%5C%5C%26quot%3B%26gt%3B%26lt%3Bdiagram%20id%3D%5C%5C%26quot%3Bja6d1TrSwdeSCgRRwp5y%5C%5C%26quot%3B%20name%3D%5C%5C%26quot%3B%E7%AC%AC%201%20%E9%A1%B5%5C%5C%26quot%3B%26gt%3B5Vhdc6IwFP01PNpRkBQfW2u7H92ZnenMfjwGcoFsA5cJQbC%2FfoMEFVHX7tq1nc74kJx783VOThK0nGlS3UmaxV%2BQgbDsIass58ay7dHYtq36N2SLBnG9cQNEkjOTtAYe%2BBMYcGjQgjPIO4kKUSiedcEA0xQC1cGolFh200IU3VEzGkEPeAio6KPfOVNxg3r25Rr%2FADyK25FHZNJEEtomm5XkMWVYbkDOzHKmElE1paSagqjJa3lp2t3uia4mJiFVxzT49O0uuS3VR3v%2B%2BfLJ4ZnIEjUwy8jVol0wML1%2BU0WpYowwpWK2Rq8lFimDutehrq1z7hEzDY40%2BAuUWhgxaaFQQ7FKhInqCcvFj7r9hdtWf5rulpWbqlNbmFpQyPly3LqTZuL1bPfyYaAcCxnAARLMFlVURqAO5JGVanq7AyagJ6fbSRBU8Xl3HtTsu2iVt5ZGF4w6z1DKTHJORWFGoskAGFcoexp2FSpjruAho0sOSm3TrhohF2KKQndTt3UYBS8MNJ4riY%2BwESGBB35YRx5BBXFHhzlIBdVhJfrMtQ2IsYg5I0atZcq141ZYvOG2tt3JyZ78hS06u%2FNsHjmhLZwjbeGd0xZOzxZM0pLjINVX0Vs3xth5bcZwe3RXHHHAMMhPS7YLHhvvItuzfYeQbbIjQfO8Y4F%2FIt6ejDvEO%2BTcxLfvofd9JJEjjyT3nEcS2XMkWTYRetLXvr6wSVSXMlFEPO0LK4R%2B3sKfTUPzrHnzhryqlT35AWRvHUCr%2BoYPvB028F7MBqM%2BW%2B%2FPBt5bsIHXs8GcQwn91%2Brr2e7O5LVt9%2F6r35oR62pqXemCZ13fWt4s1%2FugR2rNA9efsffUB%2FEVc644pjrko1KYaLrahCvBozqgcItt%2Fb2a1Z0lVVR%2F2l%2F4NOfBxXKw7n27UmHYv8fDMLSDnY8mRnziktPoRuytd9Jox3U93CHcxH0p4frv0v8nUcIFLPaJdCKrbFPuDI%2BkfAU%2Bg3NdXf9Psoxt%2FNvkzH4D%26lt%3B%2Fdiagram%26gt%3B%26lt%3B%2Fmxfile%26gt%3B%26quot%3B%2C%26quot%3Btoolbar%26quot%3B%3A%26quot%3Bpages%20zoom%20layers%20lightbox%26quot%3B%2C%26quot%3Bpage%26quot%3B%3A0%7D%22%2C%22id%22%3A%22jpsG7%22%2C%22type%22%3A%22block%22%7D"></card><p data-id="pd157317-iXAcXVGg"><br /></p>`)
    //设置引擎实例
    setEngine(engine);
    currentEngine.current = engine;
    window.addEventListener('message', handleMessage.current);
    window.addEventListener('viewerEditEvent', handleEdit.current)
    return () => {
      window.removeEventListener('message', handleMessage.current);
      window.removeEventListener('viewerEditEvent', handleEdit.current);
    }
  }, []);

  const handleTest = () => {
    const data = engine.getValue();
    console.log(data);
    const json = engine.getJsonValue();
    console.log(json);
    const html = engine.getHtml();
    console.log(html);

    engine.command.execute('hr', '123');
  }

  const handleAddDrawio = () => {
    currentXmlData.current = null;
    DrawioFrame.current.contentWindow.postMessage({
      type: 'create',
    }, '*')
    setDrawVisible(true);
    return false;
  }

  const handleOnlod = () => {
    setDrawLoading(false);
  }

  const getValue = () => {
    const value = currentEngine.current.getValue();
    console.log(value);
  }

  const handleReadWrite = () => {
    engine.readonly = !engine.readonly;
    return false;
  }

  return (
    <div className="xioo-editor">
      <div className={`draw-loading ${drawLoading ? '' : 'success'}`}>绘图工具正在加载中，请稍后在进行操作...</div>
      <div className="doc-drawio" style={{ top: `${drawVisible ? 0 : '-100%'}` }}>
        {/* <iframe src="https://drawio.xiooshow.com/webapp" onLoad={handleOnlod} ref={DrawioFrame}></iframe> */}
        <iframe src="http://localhost:2301?dev=1" onLoad={handleOnlod} ref={DrawioFrame}></iframe>
      </div>
      
      <div style={{padding: '0 16px'}}>
        {engine && <Toolbar engine={engine} items={[
          [
            {
              type: 'collapse',
              groups: [
                {
                  items: [
                    { name: 'drawio', type: 'button', icon: <WorkflowIcon />, title: '绘图', onClick: handleAddDrawio },
                    { name: 'codeblock' },
                    { name: 'table' },
                    { name: 'file-uploader' },
                    { name: 'video-uploader' },
                    { name: 'math' },
                    { name: 'status' }
                  ],
                },
              ],
            },
            { name: 'readwrite', onDisabled: () => false, type: 'button', icon: <ReadWriteIcon />, title: '读写切换', onClick: handleReadWrite },
          ],
          ['undo', 'redo', 'paintformat', 'removeformat'],
          ['heading', 'fontfamily', 'fontsize'],
          ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
          ['fontcolor', 'backcolor'],
          ['alignment'],
          [
            'unorderedlist',
            'orderedlist',
            'tasklist',
            'indent',
            'line-height',
          ],
          ['link', 'quote', 'hr']]} />}
        <div style={{ height: 400 }} ref={ref} />
      </div>
    </div>
  );
};

export default EngineDemo;


