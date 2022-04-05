import {
	$,
	Card,
	CardToolbarItemOptions,
	CardType,
	isEngine,
	ToolbarItemOptions,
	SelectStyleType,
	CardValue,
} from '@aomao/engine';
import './index.less';
export interface DrawioValue extends CardValue {
	data?: any;
}
class Drawio<T extends DrawioValue = DrawioValue> extends Card<T> {
	static get cardName() {
		return 'drawio';
	}

	static get cardType() {
		return CardType.BLOCK;
	}

	static get autoActivate() {
		return false;
	}

	static get selectStyleType() {
		return SelectStyleType.BACKGROUND;
	}

  viewer: any;

	toolbar(): Array<ToolbarItemOptions | CardToolbarItemOptions> {
		if (!isEngine(this.editor) || this.editor.readonly) return [];
		return [
			{
				type: 'dnd',
			},
			// {
			// 	type: 'copy',
			// },
      {
				type: 'node',
				node: $('<i class="iconfont icon-zoom-out draw-card-icon"></i>'),
				didMount: (node) => {
					node.on('click', () => {
						this.viewer.graph.zoomIn();
					});
				},
			},
      {
				type: 'node',
				node: $('<i class="iconfont icon-zoom-in draw-card-icon"></i>'),
				didMount: (node) => {
					node.on('click', () => {
						this.viewer.graph.zoomOut();
					});
				},
			},
      {
				type: 'node',
				node: $('<i class="iconfont icon-fangda draw-card-icon"></i>'),
				didMount: (node) => {
					node.on('click', () => {
						this.viewer.showLightbox();
					});
				},
			},
      {
				type: 'node',
				node: $('<i class="iconfont icon-size-original-s-o draw-card-icon"></i>'),
				didMount: (node) => {
					node.on('click', () => {
						this.viewer.graph.view.scaleAndTranslate(this.viewer.graph.initialViewState.scale,
              this.viewer.graph.initialViewState.translate.x,
              this.viewer.graph.initialViewState.translate.y);
					});
				},
			},
			{
				type: 'node',
				node: $('<i class="iconfont icon-a-21-xiugai draw-card-icon"></i>'),
				didMount: (node) => {
					node.on('click', () => {
						const attr = document.getElementById(this.getValue().id).getElementsByClassName('geDiagramContainer')[0].getAttribute('data-mxgraph');
						const data = JSON.parse(attr);
						var viewerEditEvent = new CustomEvent('viewerEditEvent', {
							detail: data
						})
						if(window.dispatchEvent) {  
							window.dispatchEvent(viewerEditEvent);
						} else {
							// @ts-ignore
							window.fireEvent(viewerEditEvent);
						}
					});
				},
			},
      {
				type: 'delete',
			},
		];
	}

	onActivate(activated: boolean) {
		super.onActivate(activated);
		const activatedClass = 'hr-activated';
		const center = this.getCenter();
		if (activated) {
			center.addClass(activatedClass);
		} else center.removeClass(activatedClass);
	}

	onSelectByOther(selected: boolean, value?: { color: string; rgb: string }) {
		super.onSelectByOther(selected, value);
		this.getCenter()
			.find('drawio')
			.css('background-color', selected ? value!.rgb : '');
	}

	onActivateByOther(
		activated: boolean,
		value?: { color: string; rgb: string },
	) {
		this.onSelectByOther(activated, value);
	}

  init() {
    console.log('被初始化了------->');
    setTimeout(() => {
      const div = document.getElementById(this.getValue().id).getElementsByClassName('mxgraph')[0];
      console.log(div);
      const graph = window['GraphViewer'].createViewerForElement(div, (viewer) => {
        this.viewer = viewer;
        console.log(viewer);
      }, true);
      console.log(graph);
    }, 100)
  }

	render() {
		this.getCenter().addClass('card-hr');
		return `
      <div class="draw-box">
        <div class="draw-box-select"><i class="iconfont icon-a-4-shezhi"></i></div>
        <div id=${this.getValue().id}><div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="${this.getValue().data}"></div></div>
      </div>
    `;
	}
}
export default Drawio;