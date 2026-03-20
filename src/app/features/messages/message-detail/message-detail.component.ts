import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MessagesService } from '../../../shared/services/messages.service';
import { Message } from '../../../core/models/message/message';
import { LUCIDE_ICONS, LucideIconProvider, ArrowLeft, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss'],
  imports: [RouterLink, DatePipe, CardComponent, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ArrowLeft }),
    },
  ],
})
export class MessageDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private messagesService = inject(MessagesService);

  message = signal<Message | null>(null);
  loading = signal(true);
  notFound = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading.set(false);
      this.notFound.set(true);
      return;
    }
    this.messagesService.getMessage$(id).subscribe({
      next: (msg) => {
        this.message.set(msg);
        this.loading.set(false);
        if (!msg) this.notFound.set(true);
        else this.messagesService.markAsRead$(id).subscribe();
      },
      error: () => {
        this.loading.set(false);
        this.notFound.set(true);
      },
    });
  }
}
