import { Component, Input, OnInit } from '@angular/core';
import { DataService, Person } from '../data.service';
import { debounce } from 'lodash';

export interface SelectItem {
  id: string;
  name: string;
  level?: number;
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
      name: 'Value 7',
      level: 3,
    },
    {
      id: '1.1.1.2',
      name: 'Value 8',
      level: 3,
    },
    {
      id: '1.1.1.3',
      name: 'Value 9',
      level: 3,
    },
    {
      id: '1.1.2',
      name: 'Table 2',
      level: 2,
    },
    {
      id: '1.1.2.1',
      name: 'Value 10',
      level: 3,
    },
    {
      id: '1.1.2.2',
      name: 'Value 11',
      level: 3,
    },
    {
      id: '1.1.2.3',
      name: 'Value 12',
      level: 3,
    },
  ];
  selectedItem: any;

  visibleItems: any[] = [];
  expandedMap: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.visibleItems = this.getVisibleItems();
  }

  hasChildren(index: number): boolean {
    const currentLevel = this.items[index].level || 0;

    for (let i = index + 1; i < this.items.length; i++) {
      const itemLevel = this.items[i].level || 0;

      if (itemLevel === currentLevel + 1) {
        return true;
      } else if (itemLevel <= currentLevel) {
        return false;
      }
    }

    return false;
  }

  getVisibleItems(): SelectItem[] {
    const visibleItems: SelectItem[] = [];
    let i = 0;
    const levels = this.items
      .filter((i) => !!i.level)
      .map((i) => i.level) as number[];

    while (i < Math.max(...levels)) {
      const item = this.items[i];
      const level = item.level || 0;
      visibleItems.push(item);

      // Add children if the current item is expanded
      if (this.isExpanded(item.id)) {
        while (
          i + 1 < this.items.length &&
          (this.items[i + 1].level || 0) > level
        ) {
          visibleItems.push(this.items[i + 1]);
        }
      } else {
        // Skip children of the collapsed item
        while (
          i + 1 < this.items.length &&
          (this.items[i + 1].level || 0) > level
        ) {
          i++;
        }
      }

      i++;
    }

    return visibleItems;
  }

  trackByFn(item: any): string {
    return item.id;
  }

  toggleCollapse(index: number) {
    const itemId = this.items[index].id;
    this.expandedMap[itemId] = !this.expandedMap[itemId];
    console.log(this.expandedMap);
    this.visibleItems = this.getVisibleItems();
  }

  debouncedToggleCollapse = debounce((index: number) => {
    this.toggleCollapse(index);
  }, 300); // Adjust debounce time as needed
  debounceToggleCollapse(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.debouncedToggleCollapse(index);
  }

  isExpanded(itemId: string): boolean {
    return !!this.expandedMap[itemId];
  }

  events: any[] = [];

  onChange($event: any) {
    this.events.push({ name: '(change)', value: $event });
  }

  onFocus($event: any) {
    this.events.push({ name: '(focus)', value: $event });
  }

  onBlur($event: any) {
    this.events.push({ name: '(blur)', value: $event });
  }

  onOpen() {
    this.events.push({ name: '(open)', value: null });
  }

  onClose() {
    this.events.push({ name: '(close)', value: null });
  }

  onAdd($event: any) {
    this.events.push({ name: '(add)', value: $event });
  }

  onRemove($event: any) {
    this.events.push({ name: '(remove)', value: $event });
  }

  onClear() {
    this.events.push({ name: '(clear)', value: null });
  }

  onScrollToEnd($event: any) {
    this.events.push({ name: '(scrollToEnd)', value: $event });
  }

  onSearch($event: any) {
    this.events.push({ name: '(search)', value: $event });
  }
}
