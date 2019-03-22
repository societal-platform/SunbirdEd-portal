import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
interface TopicTreeNode {
  id: string;
  name: string;
  selectable: string;
  nodes: Array<TopicTreeNode>;
}
@Component({
  selector: 'app-topic-picker',
  templateUrl: './topic-picker.component.html',
  styleUrls: ['./topic-picker.component.css']
})
export class TopicPickerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() formTopic: any;

  @Input() selectedTopics: any;

  @Input() topicPickerClass: string;

  @Output() topicChange = new EventEmitter();

  public placeHolder: string;

  public selectedNodes: any;

  constructor() {
  }
  ngOnInit() {
    const selectedTopics = _.reduce(this.selectedTopics, (collector, element) => {
      if (typeof element === 'string') {
        collector.unformatted.push(element);
      } else if (_.get(element, 'identifier')) {
        collector.formated.push(element);
      }
      return collector;
    }, { formated: [], unformatted: [] });
    this.formatSelectedTopics(this.formTopic.range, selectedTopics.unformatted, selectedTopics.formated);
    this.selectedTopics =  selectedTopics.formated;
    this.selectedNodes = {...selectedTopics.formated};
    this.topicChange.emit(this.selectedTopics);
    if (this.selectedTopics.length === 0) {
      this.placeHolder = 'Select';
    } else  if (this.selectedTopics.length > 0) {
    this.placeHolder = this.selectedTopics.length + ' selected';
            }
  }
  private formatSelectedTopics(topics, unformatted, formated) {
    _.forEach(topics, (topic) => {
      if (unformatted.includes(topic.name)) {
        formated.push({
          identifier: topic.identifier,
          name: topic.name
        });
      }
      if (topic.children) {
        this.formatSelectedTopics(topic.children, unformatted, formated);
      }
    });
  }
  ngAfterViewInit() {
    this.initTopicPicker(this.formatTopics(this.formTopic.range));
  }
  private initTopicPicker(data: Array<TopicTreeNode>) {
    $('.topic-picker-selector').treePicker({
      data: data,
      name: 'Framework',
      noDataMessage: 'No Topics/SubTopics found',
      picked: _.map(this.selectedNodes, 'identifier'),
      onSubmit: (selectedNodes) => {
        this.selectedTopics = _.map(selectedNodes, node => ({
          identifier: node.id,
          name: node.name
        }));
        this.placeHolder = this.selectedTopics.length + ' selected';
        this.topicChange.emit(this.selectedTopics);
      },
      nodeName: 'topicSelector',
      minSearchQueryLength: 1
    });
    setTimeout(() =>
    document.getElementById('topicSelector').classList.add(this.topicPickerClass), 200);
  }
  private formatTopics(topics, subTopic = false): Array<TopicTreeNode> {
    return _.map(topics, (topic) => ({
      id: topic.identifier,
      name: topic.name,
      selectable: subTopic ? 'selectable' : 'selectable',
      nodes: this.formatTopics(topic.children, true)
    }));
  }
  ngOnDestroy() {
  }
}
