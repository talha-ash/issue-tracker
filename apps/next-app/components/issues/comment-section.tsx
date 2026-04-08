'use client'

import { useState } from 'react'
import { Reply } from 'lucide-react'
import { Button } from '@issue-tracker/ui/components'
import { Textarea } from '@issue-tracker/ui/components'
import { Avatar, AvatarFallback } from '@issue-tracker/ui/components'
import { useLanguage } from '@/lib/i18n'
import { currentUser, type Comment } from '@/lib/mock-data'

interface CommentSectionProps {
  issueId: string
  comments: Comment[]
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const { t } = useLanguage()
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <div className={isReply ? 'ml-10 border-l-2 border-border pl-4' : ''}>
      <div className="flex gap-3">
        <Avatar className={isReply ? 'size-6' : 'size-8'}>
          <AvatarFallback className="bg-secondary text-xs">
            {comment.author.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(comment.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-sm text-foreground">{comment.content}</p>
          {!isReply && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Reply className="size-3" />
              {t('action.reply')}
            </button>
          )}
          
          {showReplyForm && (
            <div className="mt-3 flex gap-2">
              <Textarea
                placeholder={t('issue.write.comment')}
                className="min-h-[80px] resize-y"
              />
              <div className="flex flex-col gap-1">
                <Button size="sm">{t('action.post')}</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  {t('action.cancel')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentSection({ issueId, comments }: CommentSectionProps) {
  const { t } = useLanguage()

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">{t('issue.comments')}</h3>
      
      {/* Comment Composer */}
      <div className="mt-4 flex gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {currentUser.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder={t('issue.write.comment')}
            className="min-h-[100px] resize-y"
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm">{t('action.post')}</Button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="mt-6 space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
