import { Component, Input, OnInit } from '@angular/core';
import { DataService, Person } from '../data.service';
import { debounce } from 'lodash';

export interface SelectItem {
  id: string;
  name: string;
  level?: number;
  disabled?: boolean;
}

@Component({
  selector: 'test',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
})
export class TestComponent implements OnInit {
  @Input() items: SelectItem[] = [
    {
      id: '1',
      name: 'Quy trình 01',
      level: 0,
    },
    {
      id: '1.1',
      name: 'Biểu mẫu',
      level: 1,
    },
    {
      id: '1.1.1',
      name: 'Table 1',
      level: 2,
    },
    {
      id: '1.1.1.1',
      name: 'Value 1',
      level: 3,
    },
    {
      id: '1.1.1.2',
      name: 'Value 2',
      level: 3,
    },
    {
      id: '1.1.1.3',
      name: 'Value 3',
      level: 3,
    },
    {
      id: '1.1.2',
      name: 'Table 2',
      level: 2,
    },
    {
      id: '1.1.2.1',
      name: 'Value 4',
      level: 3,
    },
    {
      id: '1.1.2.2',
      name: 'Value 5',
      level: 3,
    },
    {
      id: '1.1.2.3',
      name: 'Value 6',
      level: 3,
    },
    {
      id: '2',
      name: 'Quy trình 2',
      level: 0,
    },
    {
      id: '2.1',
      name: 'Biểu mẫu',
      level: 1,
    },
    {
      id: '2.1.1',
      name: 'Table 1',
      level: 2,
    },
    {
      id: '2.1.1.1',
      name: 'Value 7',
      level: 3,
    },
    {
      id: '2.1.1.2',
      name: 'Value 8',
      level: 3,
    },
    {
      id: '2.1.1.3',
      name: 'Value 9',
      level: 3,
    },
    {
      id: '2.1.2',
      name: 'Table 2',
      level: 2,
    },
    {
      id: '2.1.2.1',
      name: 'Value 10',
      level: 3,
    },
    {
      id: '2.1.2.2',
      name: 'Value 11',
      level: 3,
    },
    {
      id: '2.1.2.3',
      name: 'Value 12',
      level: 3,
    },
  ];
  selectedItem: any;

  visibleItems: any[] = [];
  visibleIndexMap: { [key: number]: number } = {};
  expandedMap: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.visibleItems = this.getVisibleItems();
    this.lowestLevel = Math.min(...this.items.map((item) => item.level || 0));
  }

  getVisibleItems(term?: string): SelectItem[] {
    const visibleItems: SelectItem[] = [];

    for (const [index, option] of this.items.entries()) {
      if (this.isExpanded(this.getParentIndex(index))) {
        if (this.hasChildren(option)) {
          option.disabled = true;
        }
        visibleItems.push(option);
        this.visibleIndexMap[visibleItems.length - 1] = index;
      }
    }
    console.log(visibleItems);
    return visibleItems;
  }

  hasChildren(item: any): boolean {
    const currentLevel = item.level || 0;
    const currentItemIndex = this.items.findIndex((i) => i === item);

    for (let i = currentItemIndex + 1; i < this.items.length; i++) {
      const itemLevel = this.items[i].level || 0;
      if (itemLevel === currentLevel + 1) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  lowestLevel: number = 0;

  trackByFn(item: any): string {
    return item.id;
  }

  getParentIndex(index: number) {
    for (let i = index; i >= 0; i--) {
      const option = this.items[i];
      if (
        option.level != undefined &&
        this.items[index].level &&
        option.level < this.items[index].level
      ) {
        return i;
      }
    }
    return undefined;
  }

  toggleCollapse(index: number) {
    this.expandedMap[this.visibleIndexMap[index]] =
      !this.expandedMap[this.visibleIndexMap[index]];
    this.visibleItems = this.getVisibleItems();
  }

  debouncedToggleCollapse = debounce((index: number) => {
    this.toggleCollapse(index);
  }, 0);

  debounceToggleCollapse(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.debouncedToggleCollapse(index);
  }

  isExpanded(index?: number): boolean {
    if (index == undefined) {
      return true;
    }
    return !!this.expandedMap[index];
  }

  events: any[] = [];

  onChange($event: any) {
    this.events.unshift({ name: '(change)', value: $event });
  }

  onFocus($event: any) {
    this.events.unshift({ name: '(focus)', value: $event });
  }

  onBlur($event: any) {
    this.events.unshift({ name: '(blur)', value: $event });
  }

  onOpen() {
    this.events.unshift({ name: '(open)', value: null });
  }

  onClose() {
    this.events.unshift({ name: '(close)', value: null });
  }

  onAdd($event: any) {
    this.events.unshift({ name: '(add)', value: $event });
  }

  onRemove($event: any) {
    this.events.unshift({ name: '(remove)', value: $event });
  }

  onClear() {
    this.events.unshift({ name: '(clear)', value: null });
  }

  onScrollToEnd($event: any) {
    this.events.unshift({ name: '(scrollToEnd)', value: $event });
  }

  onSearch($event: any) {
    this.events.unshift({ name: '(search)', value: $event });
    this.visibleItems = this.getVisibleItems($event.term);
  }
}
