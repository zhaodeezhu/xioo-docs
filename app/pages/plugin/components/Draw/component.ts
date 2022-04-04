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
import './index.css';
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
				type: 'delete',
			},
			{
				type: 'node',
				node: $('<i class="iconfont icon-a-24-bianji"></i>'),
				didMount: (node) => {
					node.on('click', () => {
						console.log('我执行了----');
						console.log(node);
						// const data = this.getValue().data;
						// console.log(data);
						const attr = document.getElementById(this.getValue().id).getElementsByClassName('geDiagramContainer')[0].getAttribute('data-mxgraph');
						
						const data = JSON.parse(attr);
						console.log(data);
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
			}
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

	render() {
		console.log('我是入参')
        console.log(this.getValue());
		this.getCenter().addClass('card-hr');
		return `<div id=${this.getValue().id}><div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="${this.getValue().data}"></div></div>`;
	}
}
export default Drawio;