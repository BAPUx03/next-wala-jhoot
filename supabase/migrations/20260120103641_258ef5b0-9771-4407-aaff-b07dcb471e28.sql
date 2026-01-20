-- Create community chat messages table
CREATE TABLE public.community_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  message TEXT NOT NULL,
  is_bot BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view messages)
CREATE POLICY "Anyone can view community messages" 
ON public.community_messages 
FOR SELECT 
USING (true);

-- Create policy for public insert access (anyone can post messages)
CREATE POLICY "Anyone can post community messages" 
ON public.community_messages 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for community messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;

-- Create birthday prank links table
CREATE TABLE public.birthday_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_name TEXT NOT NULL,
  relation TEXT NOT NULL,
  sender_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.birthday_links ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view birthday links" 
ON public.birthday_links 
FOR SELECT 
USING (true);

-- Create policy for public insert access
CREATE POLICY "Anyone can create birthday links" 
ON public.birthday_links 
FOR INSERT 
WITH CHECK (true);