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
import Hr , { HrComponent } from '@aomao/plugin-hr';
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
  
  return  (
    <div className="workflow-icon">
      {/* @ts-ignore */}
      <svg style={{height: '100%', width: '100%'}} t="1646019794667" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4257" data-spm-anchor-id="a313x.7781069.0.i7" width="200" height="200"><path d="M149.333333 661.333333h213.333334v213.333334H149.333333zM753.066667 411.733333l-119.466667-119.466666c-8.533333-8.533333-8.533333-21.333333 0-29.866667l119.466667-119.466667c8.533333-8.533333 21.333333-8.533333 29.866666 0l119.466667 119.466667c8.533333 8.533333 8.533333 21.333333 0 29.866667l-119.466667 119.466666c-8.533333 8.533333-21.333333 8.533333-29.866666 0z" fill="#71D19A" p-id="4258" data-spm-anchor-id="a313x.7781069.0.i2" className=""></path><path d="M256 277.333333m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#707070" p-id="4259" data-spm-anchor-id="a313x.7781069.0.i1" className="selected"></path><path d="M768 768m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#707070" p-id="4260" data-spm-anchor-id="a313x.7781069.0.i13" className="selected"></path><path d="M234.666667 512h42.666666v106.666667h-42.666666z" fill="#90A4AE" p-id="4261"></path><path d="M256 448l-64 85.333333h128z" fill="#90A4AE" p-id="4262"></path><path d="M426.666667 256h106.666666v42.666667h-106.666666z" fill="#90A4AE" p-id="4263"></path><path d="M597.333333 277.333333l-85.333333-64v128z" fill="#90A4AE" p-id="4264"></path><path d="M746.666667 448h42.666666v106.666667h-42.666666z" fill="#90A4AE" p-id="4265"></path><path d="M768 618.666667l64-85.333334h-128z" fill="#90A4AE" p-id="4266"></path></svg>
    </div>
  )
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

  const [drawVisible, setDrawVisible] = useState<boolean>(false);
  const currentEngine = useRef<Engine>();
  const handleMessage = useRef((e) => {
    const data = e.data || {};
    if(data.type === 'drawio') {
      // 图的信息
      const ioData = data.data;
      currentEngine.current.command.execute('drawio', ioData);
      setDrawVisible(false);
    }
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
    //设置编辑器值
    // engine.setValue(`<p data-id="pd157317-lIg6OTX8">hello word</p><card type="block" name="hr" editable="false" value="data:%7B%22id%22%3A%228ppMs%22%2C%22type%22%3A%22block%22%7D"></card><p data-id="pd157317-HMCt7nxR"><br /></p>`);
    //监听编辑器值改变事件
    engine.on('change', () => {
      const value = engine.getValue();
      setContent(value);
      // console.log(`value:${value}`);
    });
    setTimeout(() => {
      window['GraphViewer'].processElements();
    }, 100)
    //设置引擎实例
    setEngine(engine);
    currentEngine.current = engine;
    window.addEventListener('message', handleMessage.current);
    return () => {
      window.removeEventListener('message', handleMessage.current);
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
    setDrawVisible(true);
    return false;
  }

  return (
    <>
      {
        drawVisible && (
          <div className="doc-drawio">
            <iframe src="https://dkfat.gz.cvte.cn/webapp"></iframe>
          </div>
        )
      }
      {/* <button onClick={handleTest}>获取数据</button> */}
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
          }
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
    </>
  );
};

export default EngineDemo;
