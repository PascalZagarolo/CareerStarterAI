'use client';

import { useState } from 'react';
import { CustomField } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { useLanguage } from './i18n/language-context';

interface CustomFieldsEditorProps {
  customFields: CustomField[];
  onUpdate: (customFields: CustomField[]) => void;
}

export default function CustomFieldsEditor({ customFields, onUpdate }: CustomFieldsEditorProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const addCustomField = () => {
    const newField: CustomField = {
      id: `custom-${Date.now()}`,
      label: 'New Field',
      value: '',
      type: 'text',
      isVisible: true,
      order: customFields.length
    };
    onUpdate([...customFields, newField]);
  };

  const removeCustomField = (fieldId: string) => {
    onUpdate(customFields.filter(field => field.id !== fieldId));
  };

  const updateCustomField = (fieldId: string, updates: Partial<CustomField>) => {
    onUpdate(customFields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const toggleFieldVisibility = (fieldId: string) => {
    updateCustomField(fieldId, { 
      isVisible: !customFields.find(f => f.id === fieldId)?.isVisible 
    });
  };

  const moveFieldUp = (fieldId: string) => {
    const currentIndex = customFields.findIndex(f => f.id === fieldId);
    if (currentIndex > 0) {
      const newFields = [...customFields];
      [newFields[currentIndex], newFields[currentIndex - 1]] = [newFields[currentIndex - 1], newFields[currentIndex]];
      onUpdate(newFields.map((field, index) => ({ ...field, order: index })));
    }
  };

  const moveFieldDown = (fieldId: string) => {
    const currentIndex = customFields.findIndex(f => f.id === fieldId);
    if (currentIndex < customFields.length - 1) {
      const newFields = [...customFields];
      [newFields[currentIndex], newFields[currentIndex + 1]] = [newFields[currentIndex + 1], newFields[currentIndex]];
      onUpdate(newFields.map((field, index) => ({ ...field, order: index })));
    }
  };

  const renderFieldEditor = (field: CustomField) => {
    const commonProps = {
      value: field.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        updateCustomField(field.id, { value: e.target.value }),
      className: "w-full"
    };

    switch (field.type) {
      case 'textarea':
        return <Textarea {...commonProps} rows={3} placeholder="Enter value..." />;
      case 'list':
        return <Textarea {...commonProps} rows={3} placeholder="Enter items separated by commas..." />;
      case 'date':
        return <Input {...commonProps} type="date" />;
      case 'url':
        return <Input {...commonProps} type="url" placeholder="https://..." />;
      default:
        return <Input {...commonProps} placeholder="Enter value..." />;
    }
  };

  if (customFields.length === 0 && !isExpanded) {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{t.ui.customFields}</h3>
              <p className="text-sm text-gray-600">Add custom fields to this section</p>
            </div>
            <Button onClick={() => setIsExpanded(true)} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t.ui.addField}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
              <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t.ui.customFields}</CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsExpanded(!isExpanded)} 
                variant="outline" 
                size="sm"
              >
                {isExpanded ? t.ui.collapse : t.ui.expand}
              </Button>
              <Button onClick={addCustomField} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t.ui.addField}
              </Button>
            </div>
          </div>
        </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {customFields.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>{t.ui.noCustomFields}</p>
              <p className="text-sm">{t.ui.noCustomFieldsDescription}</p>
            </div>
          ) : (
            customFields
              .sort((a, b) => a.order - b.order)
              .map((field) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      <Input
                        value={field.label}
                        onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                        placeholder="Field label"
                        className="w-48"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={field.type}
                        onValueChange={(value: CustomField['type']) => 
                          updateCustomField(field.id, { type: value })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="textarea">Text Area</SelectItem>
                          <SelectItem value="list">List</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="url">URL</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        onClick={() => toggleFieldVisibility(field.id)}
                        variant="outline"
                        size="sm"
                        title={field.isVisible ? 'Hide field' : 'Show field'}
                      >
                        {field.isVisible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => moveFieldUp(field.id)}
                        variant="outline"
                        size="sm"
                        disabled={field.order === 0}
                        title="Move up"
                      >
                        ↑
                      </Button>
                      
                      <Button
                        onClick={() => moveFieldDown(field.id)}
                        variant="outline"
                        size="sm"
                        disabled={field.order === customFields.length - 1}
                        title="Move down"
                      >
                        ↓
                      </Button>
                      
                      <Button
                        onClick={() => removeCustomField(field.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        title="Remove field"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">{t.ui.fieldValue}</Label>
                    {renderFieldEditor(field)}
                  </div>
                  
                  {!field.isVisible && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      {t.ui.fieldHidden}
                    </div>
                  )}
                </div>
              ))
          )}
        </CardContent>
      )}
    </Card>
  );
} 