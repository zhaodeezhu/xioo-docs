import {
	$,
	Plugin,
	NodeInterface,
	CARD_KEY,
	isEngine,
	PluginEntry,
	SchemaInterface,
	PluginOptions,
} from '@aomao/engine';
import DrawioComponent, { DrawioValue } from './component';

export interface DrawioOptions extends PluginOptions {
	hotkey?: string | Array<string>;
	markdown?: boolean;
}
export default class<T extends DrawioOptions = DrawioOptions> extends Plugin<T> {
	static get pluginName() {
		return 'drawio';
	}

	init() {
		this.editor.on('parse:html', (node) => this.parseHtml(node));
		this.editor.on('paste:schema', (schema) => this.pasteSchema(schema));
		this.editor.on('paste:each', (child) => this.pasteHtml(child));
		if (isEngine(this.editor)) {
			this.editor.on('keydown:enter', (event) => this.markdown(event));
			this.editor.on(
				'paste:markdown-check',
				(child) => !this.checkMarkdown(child)?.match,
			);
			this.editor.on('paste:markdown', (child) =>
				this.pasteMarkdown(child),
			);
		}
	}

	/**
	 * 执行命令的时候
	 * @param params 参数配置列表
	 * @returns null
	 */
	execute(params?: any) {
		if (!isEngine(this.editor)) return;
		const { card } = this.editor;
		console.log('我是命令传来的参数-----');
		console.log(params)
		card.insert<any>(DrawioComponent.cardName, {data: params});
        setTimeout(() => {
            console.log('我被执行了---')
            // console.log(params);
            const divs = document.getElementsByClassName('mxgraph');
            if(divs.length === 0) return;
            const div = divs[divs.length - 1];
            console.log(div);
            window['GraphViewer'].createViewerForElement(div);
        }, 200)
	}

	hotkey() {
		return this.options.hotkey || 'mod+shift+e';
	}

	markdown(event: KeyboardEvent) {
		if (!isEngine(this.editor) || this.options.markdown === false) return;
		const { change, command, node } = this.editor;
		const range = change.range.get();

		if (!range.collapsed || change.isComposing() || !this.markdown) return;
		const blockApi = this.editor.block;
		const block = blockApi.closest(range.startNode);

		if (!node.isRootBlock(block)) {
			return;
		}

		const chars = blockApi.getLeftText(block);
		const match = /^[-]{3,}$/.exec(chars);

		if (match) {
			event.preventDefault();
			blockApi.removeLeftText(block);
			command.execute((this.constructor as PluginEntry).pluginName);
			return false;
		}
		return;
	}

	checkMarkdown(node: NodeInterface) {
		if (!isEngine(this.editor) || !this.markdown || !node.isText()) return;

		const text = node.text();
		const reg = /(^|\r\n|\n)((-\s*){3,})\s?(\r\n|\n|$)/;
		const match = reg.exec(text);
		return {
			reg,
			match,
		};
	}

	pasteMarkdown(node: NodeInterface) {
		const result = this.checkMarkdown(node);
		if (!result) return;
		let { reg, match } = result;
		if (!match) return;

		let newText = '';
		let textNode = node.clone(true).get<Text>()!;
		const { card } = this.editor;
		while (
			textNode.textContent &&
			(match = reg.exec(textNode.textContent))
		) {
			//从匹配到的位置切断
			let regNode = textNode.splitText(match.index);
			newText += textNode.textContent;
			//从匹配结束位置分割
			textNode = regNode.splitText(match[0].length);

			const cardNode = card.replaceNode($(regNode), 'drawio');
			regNode.remove();
			//  match[1] 把之前的换行符补上
			newText += match[1] + cardNode.get<Element>()?.outerHTML + '\n';
		}
		newText += textNode.textContent;
		node.text(newText);
	}

	pasteSchema(schema: SchemaInterface) {
		schema.add([
			{
				type: 'block',
				name: 'drawio',
				isVoid: true,
			},
		]);
	}

	pasteHtml(node: NodeInterface) {
		if (!isEngine(this.editor)) return;
		if (node.name === 'drawio') {
			this.editor.card.replaceNode(node, DrawioComponent.cardName);
			return false;
		}
		return true;
	}

	parseHtml(root: NodeInterface) {
		root.find(`[${CARD_KEY}=${DrawioComponent.cardName}`).each((DrawioNode) => {
			const node = $(DrawioNode);
			const drawio = node.find('drawio');
			console.log('我是html');
			// drawio.css({
			// 	'background-color': '#e8e8e8',
			// 	border: '1px solid transparent',
			// 	margin: '18px 0',
			// });
			node.replaceWith(drawio);
		});
	}
}
export { DrawioComponent };
export type { DrawioValue };


